import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';
import SeatTypeCost from './seat-type-cost';
import Spinner from '../../../common/spinner';
import TicketCost from '../../../../services/flight-models/ticket-cost';
import * as FlightService from '../../../../services/FlightService';

function TicketsCostEditor(props) {
    const [loading, changeLoading] = useState(true);
    const [costInfo, changeCostInfo] = useState();

    useEffect(() => {
        if (!props.flightId) {
            let newCostInfo = props.seatTypes.map(
                (seatType, index) =>
                    //cost setted as 0, because 0 is start value of each seat type' ticket
                    new TicketCost(index + 1, seatType.id, 0)
            );
            changeCostInfo(newCostInfo);
            changeLoading(false);
            return;
        }

        const newCostInfoLoading = FlightService.getTicketsCost(props.flightId);

        newCostInfoLoading
            .then(
                (ticketsCostInfo) => {
                    changeCostInfo(ticketsCostInfo);
                    changeLoading(false);
                    setStartCostInfo(ticketsCostInfo);
                }
            )
            .catch();
    }, [props.flightId, props.seatTypes]);

    function setStartCostInfo(ticketsCostInfo) {
        props.onTypeCostChange(ticketsCostInfo);
    }

    function onCostInfoChange(typeId, newCost) {
        let newCostInfo = [];
        Object.assign(newCostInfo, costInfo);

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
                {props.seatTypes.map(
                    (seatType, index) =>
                        <SeatTypeCost
                            name={seatType.name}
                            cost={costInfo[index].cost}
                            key={index}
                            typeId={seatType.id}
                            onCostInfoChange={onCostInfoChange}/>
                )}
            </div>
        </div>
    );
}

TicketsCostEditor.propsTypes = {
    seatTypes: PropsTypes.array,
    flightId: PropsTypes.number,
    onTypeCostChange: PropsTypes.func
}

export default TicketsCostEditor;