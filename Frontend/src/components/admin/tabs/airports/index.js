import React, { useState } from 'react';
import AddButton from '../../../common/add-button';
import Airports from './airports';
import * as AirportService from '../../../../services/AirportService';
import Filter from './filter';
import SearchOptions from '../../../../services/airport-models/search-options';

export default function Main() {
    const [airports, changeAirports] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const foundAirports = await AirportService.search(newFilterOptions);

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