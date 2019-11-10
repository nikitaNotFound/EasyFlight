import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import SeatType from './seat-type';
import LayoutHeadline from '../layout-headline';
import MessageBox from '../../common/message-box';
import { defaultErrorMessage } from '../../common/message-box-messages';

import * as FlightService from '../../../services/FlightService';
import Spinner from '../../common/spinner';

export default function SeatTypes(props) {
    const [seatTypesWithCost, changeSeatTypesWithCost] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();
    const [loading, changeLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seatTypesCost = await FlightService.getTicketsCost(props.flightId);

                const seatTypesWithCost = props.seatTypes.slice();
                for (let seatTypeIndex = 0, len = seatTypesWithCost.length; seatTypeIndex < len; seatTypeIndex++) {
                    const seatType = seatTypesWithCost[seatTypeIndex];
                    for (let i = 0, len = seatTypesCost.length; i < len; i++) {
                        const seatTypeCost = seatTypesCost[i];

                        if (seatType.id == seatTypeCost.seatTypeId) {
                            seatType.cost = seatTypeCost.cost;
                            break;
                        }
                    }
                }

                changeSeatTypesWithCost(seatTypesWithCost);
                changeLoading(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
        fetchData();
    }, [props.flightId])

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

    if (loading) {
        return (
            <div className="seat-types-list rounded">
                {showMessageBox()}
                <LayoutHeadline content="Seat types"/>
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="seat-types-list rounded">
            {showMessageBox()}
            <LayoutHeadline content="Seat types"/>
            {seatTypesWithCost.map(
                (item, key) =>
                    <SeatType seatType={item} key={key}/>
            )}
        </div>
    );
}

SeatTypes.propsTypes = {
    seatTypes: PropsTypes.array,
    flightId: PropsTypes.number
}