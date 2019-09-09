import React, {useEffect, useState} from 'react';
import AddButton from '../../../common/add-button';
import Airports from './airports';
import * as AirportService from '../../../../services/AirportService';
import Spinner from '../../../common/spinner';

function AirportPage() {
    const [loading, changeLoadingMode] = useState(true);
    const [airports, changeAirports] = useState([]);

    useEffect(() => {
        const dataLoading = AirportService.getAll();

        dataLoading
            .then(onDataSuccessful.bind(this))
            .catch(onDataFail);
    }, []);

    function onDataSuccessful(data) {
        changeLoadingMode(false);
        changeAirports(data);
    }

    function onDataFail(error) {
        alert (error);
    }

    if (!loading) {
        return (
            <div className="tab-content">
                <AddButton catalog="airports"/>
                <Airports airports={airports}/>
            </div>
        );
    }
    return <Spinner headline="Loading..."/>
}

export default AirportPage;