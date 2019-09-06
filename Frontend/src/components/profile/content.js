import React, {useState, useEffect} from 'react';
import AddImage from '../../icons/add-image.png';
import Flights from './flights';
import * as UserService from '../../services/UserSerivce';
import * as FlightService from '../../services/FlightService';
import Spinner from '../common/spinner';
import '../../styles/profile.css';

function Content() {
    const [isLoading, changeLoadingMode] = useState(true);
    const [flights, changeFlights] = useState([]);
    const [userFlights, changeUserFlights] = useState();
    const [user, changeUser] = useState();

    useEffect(() => {
        const userLoading = UserService.getCurrentUser(1);

        userLoading
            .then((user) => {
                changeUser(user);
                return UserService.getUserFlights(user.id);
            })
            .then((userFlights) => {
                changeUserFlights(userFlights);

                if (userFlights.length > 0) {
                    let storage = userFlights.map(
                        (flight) =>
                            flight.flightId
                    );

                    return FlightService.getByIds(storage);
                }
            })
            .then((flights) => {
                if (flights) {
                    changeFlights(flights);
                }
                onDataSuccesful();
            })
            .catch(onDataFail);
    }, []);

    function onDataSuccesful() {
        changeLoadingMode(false);
    }

    function onDataFail(error) {
        alert(error);
    }

    if (isLoading) {
        return <Spinner headline="Loading..."/>
    }

    return (
        <main className="rounded">
            <div className="main-info">
                <div className="row">
                    <div className="col-2">
                        <div className="user-photo">
                            <label htmlFor="photo">
                                <img src={AddImage} alt="add user avatar"/>
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