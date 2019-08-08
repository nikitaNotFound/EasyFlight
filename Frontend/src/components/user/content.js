import React, {useState, useEffect} from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';
import Spinner from '../common/spinner';
import * as FlightsService from '../../services/FlightService';

function Content () {
    const [isLoading, changeLoadingMode] = useState(true);
    const [flights, changeFlights] = useState([]);

    useEffect(() => {
        const dataLoading = FlightsService.getAll();

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

    const layoutMode = {
        List: 'list-only',
        Filter: 'filter-only'
    };

    const [mode, changeMode] = useState(layoutMode.List);

    function swapFilterList () {
        const newMode = mode === layoutMode.List 
            ? layoutMode.Filter 
            : layoutMode.List;

        changeMode(newMode);
    }

    if (!isLoading) {
        return (
            <main className={`rounded ${mode}`}>
                <Switcher switcher={swapFilterList}/>
                <Flights flights={flights}/>
                <Filter/>
            </main>
        );
    }
    else {
        return (
            <div>
                <Spinner/>
            </div>
        );
    }
}

export default Content;