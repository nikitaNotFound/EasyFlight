import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import Spinner from '../common/spinner';
import MessageBox from '../common/message-box';
import { defaultErrorMessage } from '../common/message-box-messages';

import * as AirplaneService from '../../services/AirplaneService';

export default function Book(props) {
    const [loading, changeLoading] = useState(true);
    const [seatTypeName, changeSeatTypeName] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useState(() => {
        const fetchData = async () => {
            try {
                console.log(props.book)
                const seat = await AirplaneService.getSeatById(props.book.seatId);

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
            Floor: {props.book.floor} <br/>
            Section: {props.book.section} <br/>
            Zone: {props.book.zone} <br/>
            Row: {props.book.row} <br/>
            Number: {props.book.number} <br/>
            Seat type: {seatTypeName}
        </div>
    );
}

Book.propsTypes = {
    book: PropsTypes.object
}