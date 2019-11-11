import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AddImage from '../../icons/add-image.png';
import '../../styles/profile.css';

import * as UserService from '../../services/UserSerivce';
import * as FlightService from '../../services/FlightService';

import Spinner from '../common/spinner';
import Flights from './flights';
import MessageBox from '../common/message-box';
import { defaultErrorMessage } from '../common/message-box-messages';

import { changeUserInfo } from '../../store/actions/UserInfoActions';

import { connect } from 'react-redux';

function Content(props) {
    const [isLoading, changeLoadingMode] = useState(true);
    const [accountBooks, changeAccountBooks] = useState([]);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFlights = await FlightService.getAccountBooks()

                changeAccountBooks(userFlights);
                changeLoadingMode(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
        fetchData();
    }, []);

    function showMessageBoxValue() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    if (isLoading) {
        return (
            <main className="rounded">
                {showMessageBoxValue()}
                <Spinner headline="Loading..."/>
            </main>
        );
    }

    return (
        <main className="rounded">
            {showMessageBoxValue()}
            <div className="main-info">
                <div className="row">
                    <div className="col-2">
                        <div className="user-photo">
                            <label htmlFor="photo">
                                <img src={AddImage} alt="add user avatar" />
                            </label>
                            <input type="file" id="photo" />
                        </div>
                    </div>
                    <div className="col-10">
                        <input type="text" className="name-input" value={props.firstName}/>
                    </div>
                </div>
            </div>

            <div className="flight-history">
                <div className="flight-history-headline non-selectable">Your flights</div>
                <Flights accountBooks={accountBooks} />
            </div>
        </main>
    );
}

export default withRouter(connect(state => state.userInfo)(Content));
