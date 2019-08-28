import React, {useState, useEffect} from 'react';
import AddImage from '../../icons/add-image.png';
import Flights from './flights';
import * as UserService from '../../services/UserSerivce';
import * as FlightService from '../../services/FlightService';
import Spinner from '../common/spinner';

function Content () {
    const [isLoading, changeLoadingMode] = useState(true);
    const [flights, changeFlights] = useState([]);
    const [userFlights, changeUserFlights] = useState();
    const [user, changeUser] = useState();

    useEffect(() => {
        const userLoading = UserService.getUserById(1);

        userLoading
            .then((user) => {
                changeUser(user);
                const userFlightsLoading = UserService.getUserFlights(user.id);

                userFlightsLoading
                    .then((userFlights) => {
                        changeUserFlights(userFlights);

                        if (userFlights.length > 0) {
                            const flightIds = () => {
                                let storage = [];

                                for (let i = 0, len = userFlights.length; i < len; i++) {
                                    const element = userFlights[i];
                                    storage.push(element.flightId);
                                }

                                return storage;
                            }

                            const flightsLoading = FlightService.getFlightsById(flightIds());
                            flightsLoading
                                .then((flights) => {
                                    changeFlights(flights);
                                    onDataSuccesful();
                                });
                        }
                        else {
                            onDataSuccesful();
                        }
                    });
            })
            .catch(onDataFail);
    }, []);

    function onDataSuccesful () {
        changeLoadingMode(false);
    }

    function onDataFail (error) {
        alert(error);
    }

    if (isLoading) {
        return (
            <Spinner/>
        );
    }

    return (
        <main className="rounded">
            <div className="main-info">
                <div className="row">
                    <div className="col-2">
                        <div className="user-photo">
                            <label htmlFor="photo">
                                <img src={AddImage}/>
                            </label>
                            <input type="file" id="photo"/>
                        </div>
                    </div>
                    <div className="col-10">
                        <input type="text" className="name-input" value={user.name}/>
                    </div>
                </div>
            </div>

            <div className="flight-history">
                <div className="flight-history-headline non-selectable">Your flights</div>
                <Flights flights={flights}/>
            </div>
        </main>
    );
}

export default Content;