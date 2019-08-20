import React, {useState, useEffect} from 'react';
import AddButton from '../common/add-button';
import Airplanes from './airplanes';
import * as AirplaneService from '../../../../services/AirplaneService';
import Spinner from '../../../common/spinner';

function AirplanePage () {
    const [isLoading, changeLoadingMode] = useState(true);
    const [airplanes, changeAirplanes] = useState([]);

    useEffect(() => {
        const dataLoading= AirplaneService.getAll();

        dataLoading
            .then(onDataSuccessful.bind(this))
            .catch(onDataFail);
    });

    function onDataSuccessful (data) {
        changeLoadingMode(false);
        changeAirplanes(data);
    }

    function onDataFail (error) {
        alert (error);
    }

    if (!isLoading) {
        return (
            <div className="tab-content">
                <AddButton catalog="airplanes"/>
                <Airplanes airplanes={airplanes}/>
            </div>
        );
    }
    else {
        return (
            <div className="tab-content">
                <Spinner/>
            </div>
        );
    }
}

export default AirplanePage;