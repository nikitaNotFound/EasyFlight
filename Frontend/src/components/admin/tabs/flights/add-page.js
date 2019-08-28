import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from './search-list';
import Spinner from '../../../common/spinner';
import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';

function Adding () {
    const [loading, changeLoadingMode] = useState(true);
    const [airports, changeAirports] = useState([]);
    const [airplanes, changeAirplanes] = useState([]);

    useEffect(() => {
        const airportsLoading = AirportService.getAirports();
        const airplanesLoading = AirplaneService.getAirplanes();

        Promise.all([airportsLoading, airplanesLoading])
            .then(values => {
                onDataSuccessful(values);
            })
            .catch(onDataFail);
    }, []);

    function onDataSuccessful (data) {
        let [airports, airplanes] = data;
        
        changeAirports(airports);
        changeAirplanes(airplanes);
        changeLoadingMode(false);
    }

    function onDataFail (error) {
        alert(error);
    }

    if(!loading) {
        return (
            <div className="list-item-action">
                <Headline name="Adding new flight"/>

                <div className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={BuyIcon} className="adding-form-img" alt="add"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="editing-params-form">
                                <div className="row">
                                    <SearchList array={airports} placeholder="From"/>
                                    <SearchList array={airports} placeholder="To"/>
                                    <div className="form-item">
                                        <label htmlFor="departure-time">Departure time</label>
                                        <input id="departure-time" type="time"/>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="flight-cost">Cost</label>
                                        <input id="flight-cost" type="text"/>
                                    </div>
                                    <SearchList array={airplanes} placeholder="airplane"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </div>
            </div>
        );
    }
    return (
        <Spinner/>
    );
}

export default Adding;