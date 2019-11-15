import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import { Link } from 'react-router-dom';

import '../../styles/waiting-for-payment.css';
import Spinner from '../common/spinner';

import * as FlightService from '../../services/FlightService';

import * as config from '../../config.json';

function startWaiting(callback, bookId) {
    const request = async () => {
        try {
            const statusObject = await FlightService.getBookStatus(bookId);

            if (statusObject.status == config.BOOK_TYPES.Payed) {
                callback(waitingModes.Payed);
            } else {
                request();
            }
        } catch {
            callback(waitingModes.Error);
        }
    }

    request();

    return waitingModes.Payed;
}

const waitingModes = {
    Waiting: 1,
    Payed: 2,
    Error: 3
}

export default function WaitingForPayment(props) {
    const [waitingMode, changeWaitingMode] = useState();

    useEffect(() => {
        startWaiting(changeWaitingMode, props.bookId);
    }, [])

    if (waitingMode === waitingModes.Error) {
        return (
            <div>
                <div className="overlay"/>
                <div className="waiting-for-payment">
                    <div className="text">
                        Ooooops... Something wrong...
                    </div>
                    <div className="error-text">
                        But don't scared! All will be okay. Looks like 
                        our server went to sleep. As soon it wakes up, check 
                        your profile, your tickets will be in it.
                    </div>
                </div>
            </div>
        );
    }

    if (waitingMode === waitingModes.Payed) {
        return (
            <div>
                <div className="overlay"/>
                <div className="waiting-for-payment">
                    <div className="text">
                        Payed!
                    </div>
                    <div className="option-buttons">
                        <Link to="" className="non-dec-link">
                            <button className="another-book">
                                Make another book
                            </button>
                        </Link>
                        <Link to="/profile" className="non-dec-link">
                            <button className="go-profile">
                                Go to profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="overlay"/>
            <div className="waiting-for-payment">
                <Spinner/>
                <div className="text">
                    Waiting for payment...
                </div>
            </div>
        </div>
    );
}

WaitingForPayment.propsTypes = {
    bookId: PropsTypes.number
}