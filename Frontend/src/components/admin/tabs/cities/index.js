import React, { useState } from 'react';

import AddButton from '../../../common/add-button';
import Cities from './cities';
import Filter from './filter';
import MessageBox from '../../../common/message-box';

import * as PlaceService from '../../../../services/PlaceService';

import SearchOptions from '../../../../services/airport-models/search-options';

export default function CityList() {
    const [cities, changeCities] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        let foundCities = null;

        if (newFilterOptions.name && newFilterOptions.countryId) {
            foundCities = await PlaceService.searchCountryCitiesByName(newFilterOptions.countryId, newFilterOptions.name);
        } else if (newFilterOptions.countryId) {
            foundCities = await PlaceService.getCountryCities(newFilterOptions.countryId);
        } else {
            foundCities = await PlaceService.searchCitiesByName(newFilterOptions.name);
        }

        if (citiesRequest.successful === true) {
            changeCities(citiesRequest.value);
        } else {
            changeMessageBoxValue(citiesRequest.value);
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