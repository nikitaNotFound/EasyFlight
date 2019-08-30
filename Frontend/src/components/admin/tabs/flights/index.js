import React, {useState, useEffect} from 'react';
import AddButton from '../common/add-button';
import Flights from './flights';
import Spinner from '../../../common/spinner';
import * as FlightService from '../../../../services/FlightService';

function FlightPage () {
    const [loading, changeLoadingMode] = useState(true);
    const [flights, changeFlights] = useState([]);

    useEffect(() => {
        const dataLoading = FlightService.getAll();

        dataLoading
            .then(onDataSuccessful.bind(this))
            .catch(onDataFail);
    });
    
    function onDataSuccessful (data) {
        changeLoadingMode(false);
        changeFlights(data);
    }

    function onDataFail (error) {
        alert (error);
    }

    if (!loading) {
        return (
            <div className="tab-content">
                <AddButton catalog="flights"/>
                <Flights flights={flights}/>
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

export default FlightPage;