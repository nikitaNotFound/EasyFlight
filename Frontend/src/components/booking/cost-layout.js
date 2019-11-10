import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';

import LayoutHeadline from './layout-headline';
import Spinner from '../common/spinner';

import * as FlightService from '../../services/FlightService';


export default function CostLayout(props) {
    const [loading, changeLoading] = useState(true);
    const [finalCost, changeFinalCost] = useState(null);
    const [overloadSuitcaseCost, changeOverloadSuitcaseCost] = useState(0);
    const [overloadHandLuggageCost, changeHandLuggageSuitcaseCost] = useState(0);
    const [ticketsCost, changeTicketsCost] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let finalCost = 0;

            const ticketsCost = await FlightService.getTicketsCost(props.flight.id);

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

            changeTicketsCost(finalCost);

            let suitcaseOverloadMassKg =
                props.suitcaseCount * props.flight.suitcaseMassKg
                - props.flight.suitcaseCount * props.flight.suitcaseMassKg;

            suitcaseOverloadMassKg = suitcaseOverloadMassKg > 0
                ? suitcaseOverloadMassKg
                : 0;

            changeOverloadSuitcaseCost(suitcaseOverloadMassKg * props.flight.massOverloadKgCost);

            let handLuggageOverloadMassKg =
                props.handLuggageCount * props.flight.handLuggageMassKg
                - props.flight.handLuggageCount * props.flight.handLuggageMassKg;

            handLuggageOverloadMassKg = handLuggageOverloadMassKg > 0
                ? handLuggageOverloadMassKg
                : 0;

            changeHandLuggageSuitcaseCost(handLuggageOverloadMassKg * props.flight.massOverloadKgCost);

            const overloadCost = (suitcaseOverloadMassKg + handLuggageOverloadMassKg) * props.flight.massOverloadKgCost;

            finalCost += overloadCost;

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
    handLuggageCount: PropsTypes.number
}