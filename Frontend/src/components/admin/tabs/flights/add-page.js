import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from './search-list';
import Spinner from '../../../common/spinner';
import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';

function Adding () {
    const [isLoading, changeLoadingMode] = useState(true);
    const [airports, changeAirports] = useState([]);
    const [airplanes, changeAirplanes] = useState([]);

    useEffect(() => {
        const airportsLoading = AirportService.getAll();
        const airplanesLoading = AirplaneService.getAll();

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

    if(!isLoading) {
        return (
            <div className="list-item-action">
                <Headline name="Adding new flight"/>

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
                                <SearchList array={airports} placeholder="from"/>
                                <SearchList array={airports} placeholder="to"/>
                                <div className="form-item">
                                    <label>departure time</label><br/>
                                    <input type="time"/>
                                </div>
                                <SearchList array={airplanes} placeholder="airplane"/>
                            </div>
                            <br/>
                            <textarea placeholder="description"/>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </form>
            </div>
        );
    }
    else {
        return (
            <Spinner/>
        );
    }
}

export default Adding;