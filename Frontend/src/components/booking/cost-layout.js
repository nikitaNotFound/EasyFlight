import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';

import LayoutHeadline from './layout-headline';
import Spinner from '../common/spinner';

import * as FlightService from '../../services/FlightService';
import BookCostInfo from '../../services/flight-models/book-cost-info';


export default function CostLayout(props) {
    const [loading, changeLoading] = useState(true);
    const [finalCost, changeFinalCost] = useState(null);
    const [overloadSuitcaseCost, changeOverloadSuitcaseCost] = useState(0);
    const [overloadHandLuggageCost, changeHandLuggageSuitcaseCost] = useState(0);
    const [ticketsCost, changeTicketsCost] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let finalCost = 0;
            let seatsCost = [];

            const ticketsCost = await FlightService.getTicketsCost(props.flight.id);

            for (let seatIndex = 0, len = props.choosenSeats.length; seatIndex < len; seatIndex++) {
                const currentSeat = props.choosenSeats[seatIndex];

                for (let typeIndex = 0, len = ticketsCost.length; typeIndex < len; typeIndex++) {
                    const currentType = ticketsCost[typeIndex];

                    if (currentSeat.typeId == currentType.seatTypeId) {
                        finalCost += Number(currentType.cost);
                        seatsCost[currentSeat.id] = currentType.cost;
                        break;
                    }
                }
            }

            const finalTicketsCost = finalCost;
            changeTicketsCost(finalCost);

            let suitcaseOverloadMassKg =
                props.suitcaseCount * props.flight.suitcaseMassKg
                - props.flight.suitcaseCount * props.flight.suitcaseMassKg;

            suitcaseOverloadMassKg = suitcaseOverloadMassKg > 0
                ? suitcaseOverloadMassKg
                : 0;

            const overloadSuitcaseCost = suitcaseOverloadMassKg * props.flight.massOverloadKgCost;
            changeOverloadSuitcaseCost(overloadSuitcaseCost);

            let handLuggageOverloadMassKg =
                props.handLuggageCount * props.flight.handLuggageMassKg
                - props.flight.handLuggageCount * props.flight.handLuggageMassKg;

            handLuggageOverloadMassKg = handLuggageOverloadMassKg > 0
                ? handLuggageOverloadMassKg
                : 0;

            const overloadHandLuggageCost = handLuggageOverloadMassKg * props.flight.massOverloadKgCost
            changeHandLuggageSuitcaseCost(overloadHandLuggageCost);

            const overloadCost = (suitcaseOverloadMassKg + handLuggageOverloadMassKg) * props.flight.massOverloadKgCost;

            finalCost += overloadCost;

            const finalBookCostInfo = new BookCostInfo(
                overloadSuitcaseCost,
                overloadHandLuggageCost,
                finalTicketsCost,
                finalCost,
                seatsCost
            );

            props.changeBookCostInfo(finalBookCostInfo);

            changeFinalCost(finalCost);
            changeLoading(false);
        }
        fetchData();
    }, [props.flight.id]);

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
            {`tickets (${ticketsCost}) + suitcase overload (${overloadSuitcaseCost}) + 
            hand luggage overload (${overloadHandLuggageCost}) = final cost (${finalCost})`}
            <div className="final-cost">
                {finalCost}$
            </div>
        </div>
    );
}

CostLayout.propsTypes = {
    flight: PropsTypes.object,
    choosenSeats: PropsTypes.array,
    suitcaseCount: PropsTypes.number,
    handLuggageCount: PropsTypes.number,
    changeBookCostInfo: PropsTypes.func
}