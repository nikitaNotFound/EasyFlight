import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';

import LayoutHeadline from './layout-headline';
import Spinner from '../common/spinner';

import * as FlightService from '../../services/FlightService';


export default function CostLayout(props) {
    const [loading, changeLoading] = useState(true);
    const [finalCost, changeFinalCost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let finalCost = 0;

            const ticketsCost = await FlightService.getTicketsCost(props.flightId);

            for (let seatIndex = 0, len = props.choosenSeats.length; seatIndex < len; seatIndex++) {
                const currentSeat = props.choosenSeats[seatIndex];

                for (let typeIndex = 0, len = ticketsCost.length; typeIndex < len; typeIndex++) {
                    const currentType = ticketsCost[typeIndex];

                    if (currentSeat.typeId == currentType.seatTypeId) {
                        finalCost += Number(currentType.cost);
                        break;
                    }
                }
            }
            
            changeFinalCost(finalCost);
            changeLoading(false);
        }
        fetchData();
    }, [props]);

    if (loading) {
        return (
            <div className="cost-layout rounded">
                <LayoutHeadline content="Final cost"/>
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="cost-layout rounded">
            <LayoutHeadline content="Final cost"/>
            {finalCost}
        </div>
    );
}

CostLayout.propsTypes = {
    flightId: PropsTypes.flightId,
    choosenSeats: PropsTypes.array,
    baggageCount: PropsTypes.number
}