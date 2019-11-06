import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';
import SeatTypeCost from './seat-type-cost';
import Spinner from '../../../common/spinner';
import TicketCost from '../../../../services/flight-models/ticket-cost';
import * as FlightService from '../../../../services/FlightService';
import * as AirplaneService from '../../../../services/AirplaneService';

export default function TicketsCostEditor(props) {
    const [loading, changeLoading] = useState(true);
    const [costInfo, changeCostInfo] = useState();
    const [seatTypes, changeSeatTypes] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const types = await AirplaneService.getAirplaneSeatTypes(props.airplaneId);

            changeSeatTypes(types);

            if (!props.flightId) {
                let newCostInfo = types.map(
                    (seatType, index) =>
                        //cost setted as 0, because 0 is start value of each seat type' ticket
                        new TicketCost(null, seatType.id, 0)
                );
                changeCostInfo(newCostInfo);
            }

            changeLoading(false);
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
        return <Spinner headline="Loading..."/>
    }

    return (
        <div className="adding-form-section">
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