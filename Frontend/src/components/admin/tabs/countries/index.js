import React, { useState } from 'react';

import AddButton from '../../../common/add-button';
import Countries from './countries';
import Filter from './filter';

import * as PlaceService from '../../../../services/PlaceService';

import SearchOptions from '../../../../services/airport-models/search-options';

export default function CountryList() {
    const [countries, changeCountries] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const foundAirports = await PlaceService.searchCountriesByName(newFilterOptions);

        changeCountries(foundAirports);
    }

    return (
        <div className="tab-content">
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="countries"/>
            <Countries countries={countries}/>
        </div>
    );
}