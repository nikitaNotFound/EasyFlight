import React, { useState } from 'react';

import AddButton from '../../../common/add-button';
import Countries from './countries';
import Filter from './filter';
import MessageBox from '../../../common/message-box';

import * as PlaceService from '../../../../services/PlaceService';

import SearchOptions from '../../../../services/airport-models/search-options';

export default function CountryList() {
    const [countries, changeCountries] = useState(null);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        try {
            const countriesRequest = await PlaceService.searchCountriesByName(newFilterOptions);
            changeCountries(countriesRequest);
        } catch (ex) {
            changeMessageBoxValue(ex.message);
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
            <AddButton catalog="countries"/>
            <Countries countries={countries} startCitiesValue={null}/>
        </div>
    );
}