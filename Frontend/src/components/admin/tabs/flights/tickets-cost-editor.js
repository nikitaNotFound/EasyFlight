import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';
import SeatTypeCost from './seat-type-cost';
import Spinner from '../../../common/spinner';
import TicketCost from '../../../../services/flight-models/ticket-cost';
import * as FlightService from '../../../../services/FlightService';
import * as AirplaneService from '../../../../services/AirplaneService';
import MessageBox from '../../../common/message-box';
import { defaultErrorMessage } from '../../../common/message-box-messages';

export default function TicketsCostEditor(props) {
    const [loading, changeLoading] = useState(true);
    const [costInfo, changeCostInfo] = useState();
    const [seatTypes, changeSeatTypes] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            changeLoading(true);
            try {
                const types = await AirplaneService.getAirplaneSeatTypes(props.airplaneId);
                changeSeatTypes(types);
                
                if (!props.flightId) {
                    let newCostInfo = types.map(
                        (seatType) => new TicketCost(null, seatType.id, 0)
                    );
                    changeCostInfo(newCostInfo);
                    props.onTypeCostChange(newCostInfo);
                } else {
                    const costInfo = await FlightService.getTicketsCost(props.flightId);

                    changeCostInfo(costInfo);
                    props.onTypeCostChange(costInfo);
                }
                    
                changeLoading(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }

        fetchData();
    }, [props.flightId, props.airplaneId]);

    function onCostInfoChange(typeId, newCost) {
        let newCostInfo = costInfo.slice();

        for (let i = 0, len = newCostInfo.length; i < len; i++) {
            if (newCostInfo[i].seatTypeId == typeId) {
                newCostInfo[i].cost = newCost;
                break;
            }
        }

        changeCostInfo(newCostInfo);
        props.onTypeCostChange(newCostInfo);
    }

    if (loading) {
        return (
            <div className="adding-form-section">
                {showMessageBox()}
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    return (
        <div className="adding-form-section">
            {showMessageBox()}
            <div className="row">
                {seatTypes.map(
                    (seatType, index) =>
                        <SeatTypeCost
                            name={seatType.name}
                            cost={costInfo[index].cost}
                            key={index}
                            typeId={seatType.id}
                            onCostInfoChange={onCostInfoChange}
                        />
                )}
            </div>
        </div>
    );
}

TicketsCostEditor.propsTypes = {
    airplaneId: PropsTypes.number,
    flightId: PropsTypes.number,
    onTypeCostChange: PropsTypes.func
}