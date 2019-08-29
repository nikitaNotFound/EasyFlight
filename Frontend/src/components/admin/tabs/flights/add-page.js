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

    const [airplane, changeAirplane] = useState();

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

    function onAirplaneChange (airplane) {
        changeAirplane(airplane);
    }

    function ticketsCostLayout (airplane) {
        if (!airplane) {
            return;
        }

        return (
            <div className="adding-form-section">
                <div className="row">
                    <div className="form-item">
                        <label>Departure time</label>
                        <input type="time"/>
                    </div>
                    <div className="form-item tabulation">
                        <label>Departure date</label>
                        <input type="date"/>
                    </div>
                    <div className="form-item">
                        <label>Departure back time</label>
                        <input type="time"/>
                    </div>
                    <div className="form-item">
                        <label>Departure back date</label>
                        <input type="date"/>
                    </div>
                </div>
            </div>
        );
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
                                    <SearchList array={airplanes} onValueChange={onAirplaneChange} placeholder="airplane"/>
                                    <div className="adding-form-section">
                                        <div className="row">
                                            <div className="form-item">
                                                <label htmlFor="dep-time">Departure time</label>
                                                <input id="dep-time" type="time"/>
                                            </div>
                                            <div className="form-item tabulation">
                                                <label htmlFor="dep-date">Departure date</label>
                                                <input id="dep-date" type="date"/>
                                            </div>
                                            <div className="form-item">
                                                <label htmlFor="dep-back-time">Departure back time</label>
                                                <input id="dep-back-time" type="time"/>
                                            </div>
                                            <div className="form-item">
                                                <label htmlFor="dep-back-date">Departure back date</label>
                                                <input id="dep-back-date" type="date"/>
                                            </div>
                                        </div>
                                        {ticketsCostLayout()}
                                    </div>
                                    <br/>
                                    <textarea placeholder="description"/>
                                </div>
                            </div>
                        </div>
                        <input type="submit" value="Add" className="add-button"/>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <Spinner/>
    );
}

export default Adding;