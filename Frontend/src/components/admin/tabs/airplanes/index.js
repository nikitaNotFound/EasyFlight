import React, {useState, useEffect} from 'react';
import AddButton from '../../../common/add-button';
import Airplanes from './airplanes';
import * as AirplaneService from '../../../../services/AirplaneService';
import Spinner from '../../../common/spinner';

function AirplanePage() {
    const [loading, changeLoadingMode] = useState(true);
    const [airplanes, changeAirplanes] = useState([]);

    useEffect(() => {
        const dataLoading= AirplaneService.getAll();

        dataLoading
            .then(onDataSuccessful.bind(this))
            .catch(onDataFail);
    });

    function onDataSuccessful(data) {
        changeLoadingMode(false);
        changeAirplanes(data);
    }

    function onDataFail(error) {
        alert (error);
    }

    if (!loading) {
        return (
            <div className="tab-content">
                <AddButton catalog="airplanes"/>
                <Airplanes airplanes={airplanes}/>
            </div>
        );
    }
    return <Spinner headline="Loading..."/>
}

export default AirplanePage;