import React, {useEffect, useState} from 'react';
import AddButton from '../../../common/add-button';
import Airports from './airports';
import * as AirportService from '../../../../services/AirportService';
import Filter from './filter';
import SearchOptions from '../../../../services/airport-models/search-options';

function getEmptyFilterOptions() {
    return new SearchOptions(null, null, null);
}

function AirportPage() {
    const [airports, changeAirports] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(getEmptyFilterOptions);

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const foundAirports = await AirportService.searchWithParams(newFilterOptions);

        changeAirports(foundAirports);
    }

    return (
        <div className="tab-content">
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="airports"/>
            <Airports airports={airports}/>
        </div>
    );
}

export default AirportPage;