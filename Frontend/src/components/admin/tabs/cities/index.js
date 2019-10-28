import React, { useState } from 'react';

import AddButton from '../../../common/add-button';
import Cities from './cities';
import Filter from './filter';
import MessageBox from '../../../common/message-box';

import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';

import SearchOptions from '../../../../services/airport-models/search-options';

export default function CityList() {
    const [cities, changeCities] = useState(null);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        try {
            let citiesRequest = null;

            if (newFilterOptions.name && newFilterOptions.countryId) {
                citiesRequest = await CountryService.searchCountryCitiesByName(newFilterOptions.countryId, newFilterOptions.name);
            } else if (newFilterOptions.countryId) {
                citiesRequest = await CountryService.getCountryCities(newFilterOptions.countryId);
            } else {
                citiesRequest = await CityService.searchCitiesByName(newFilterOptions.name);
            }

            changeCities(citiesRequest);
        } catch {
            changeMessageBoxValue('Something went wrong...');
        }
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    return (
        <div className="tab-content">
            {showMessageBox()}
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="cities"/>
            <Cities cities={cities}/>
        </div>
    );
}