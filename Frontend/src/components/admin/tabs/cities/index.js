import React, { useState } from 'react';

import AddButton from '../../../common/add-button';
import Cities from './cities';
import Filter from './filter';
import SubmitBox from '../../../common/submit-box';
import MessageBox from '../../../common/message-box';

import * as PlaceService from '../../../../services/PlaceService';

import SearchOptions from '../../../../services/airport-models/search-options';


export default function Main() {
    const [cities, changeCities] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const foundCities = await PlaceService.searchCities(newFilterOptions.name, [newFilterOptions.countryId]);

        changeCities(foundCities);
    }

    return (
        <div className="tab-content">
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="cities"/>
            <Cities cities={cities}/>
        </div>
    );
}