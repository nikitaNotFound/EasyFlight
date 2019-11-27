import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import Spinner from '../common/spinner';
import MessageBox from '../common/message-box';
import { defaultErrorMessage } from '../common/message-box-messages';

import * as AirplaneService from '../../services/AirplaneService';

export default function Book(props) {
    const [loading, changeLoading] = useState(true);
    const [seatTypeName, changeSeatTypeName] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();
    const [seatPos, changeSeatPos] = useState();

    useState(() => {
        const fetchData = async () => {
            try {
                const seat = await AirplaneService.getSeatById(props.book.seatId);

                changeSeatPos(seat);

                const seatType = await AirplaneService.getSeatTypeById(seat.typeId);

                changeSeatTypeName(seatType.name);
                changeLoading(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
        fetchData();
    }, [props.book]);

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
            <div className="account-flight-book">
                {showMessageBox()}
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="account-flight-book">
            {showMessageBox()}
            Floor: {seatPos.floor} <br/>
            Section: {seatPos.section} <br/>
            Zone: {seatPos.zone} <br/>
            Row: {seatPos.row} <br/>
            Number: {seatPos.number} <br/>
            Seat type: {seatTypeName} <br/>
            Cost: {props.book.cost}$
        </div>
    );
}

Book.propsTypes = {
    book: PropsTypes.object
}