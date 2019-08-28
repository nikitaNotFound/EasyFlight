import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from './search-list';
import Spinner from '../../../common/spinner';
import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';
import * as FlightService from '../../../../services/FlightService';

function Editing (props) {
    const [loading, changeLoadingMode] = useState(true);
    const [airports, changeAirports] = useState([]);
    const [airplanes, changeAirplanes] = useState([]);
    const [flight, changeFlight] = useState();

    useEffect (() => {
        const airportsLoading = AirportService.getAirports();
        const airplanesLoading = AirplaneService.getAirplanes();
        const flightLoading = FlightService.getFlightById(props.match.params.id);

        Promise.all([airportsLoading, airplanesLoading, flightLoading])
            .then(values => {
                onDataSuccessful(values);
            })
            .catch(onDataFail);
    }, []);

    function onDataSuccessful (data) {
        let [airports, airplanes, flight] = data;

        changeAirports(airports);
        changeAirplanes(airplanes);
        changeFlight(flight);
        changeLoadingMode(false);
    }

    function onDataFail (error) {
        alert(error);
    }

    if (loading) {
        return (<Spinner/>);
    }
    return (
        <div className="list-item-action editing">
            <Headline name="Editing flight"/>

            <form method="post" className="adding-form">
                <div className="row">
                    <div className="col-2">
                        <input type="file" name="image" id="file-input" className="file-upload"/>
                        <label htmlFor="file-input">
                            <img src={BuyIcon} className="adding-form-img" alt="add"/>
                        </label>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <SearchList array={airports} placeholder="From" value={flight.from}/>
                            <SearchList array={airports} placeholder="To" value={flight.to}/>
                            <div className="form-item">
                                <label>Departure time</label>
                                <input type="time" value={props.departureTime}/>
                            </div>
                            <SearchList array={airplanes} placeholder="airplane" value={flight.airplane}/>
                        </div>
                        <br/>
                        <textarea placeholder="description" value={flight.desc}/>
                    </div>
                </div>
                <input type="submit" value="Add" className="add-button"/>
            </form>
        </div>
    );
}

export default Editing;