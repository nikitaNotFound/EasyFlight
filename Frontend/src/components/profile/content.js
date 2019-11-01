import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AddImage from '../../icons/add-image.png';
import '../../styles/profile.css';

import * as UserService from '../../services/UserSerivce';
import * as FlightService from '../../services/FlightService';

import Spinner from '../common/spinner';
import Flights from './flights';

import { changeUserInfo } from '../../store/actions/UserInfoActions';

import { connect } from 'react-redux';

function Content(props) {
    const [isLoading, changeLoadingMode] = useState(true);
    const [flights, changeFlights] = useState([]);
    const [userFlights, changeUserFlights] = useState();
    const [user, changeUser] = useState(props);

    useEffect(() => {
        const userFlightsLoading = UserService.getUserFlights(user.id);

        userFlightsLoading
            .then(userFlights => {
                changeUserFlights(userFlights);

                if (userFlights.length > 0) {
                    let storage = userFlights.map(flight => flight.flightId);

                    return FlightService.getByIds(storage);
                }
            })
            .then(flights => {
                if (flights) {
                    changeFlights(flights);
                }
                changeLoadingMode(false);
            })
            .catch(error => {
                alert(error);
            });
    }, []);

    async function onLogout() {
        await UserService.logout();
        changeUserInfo(null);
        props.history.push("/");
    }

    if (isLoading) {
        return <Spinner headline="Loading..." />;
    }

    return (
        <main className="rounded">
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
                        <input type="text" className="name-input" value={user.firstName} />

                        <button className="logout rounded non-selectable" onClick={onLogout}>
                            log out
                        </button>
                    </div>
                </div>
            </div>

            <div className="flight-history">
                <div className="flight-history-headline non-selectable">Your flights</div>
                <Flights flights={flights} />
            </div>
        </main>
    );
}

export default withRouter(connect(state => state.userInfo)(Content));
