import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import SearchOptions from '../../../../services/airport-models/search-options';
import * as PlaceService from '../../../../services/PlaceService';

export default function Filter(props) {
    const [name, changeName] = useState(props.filterOptions.name);
    const [city, changeCity] = useState(props.filterOptions.city);
 
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!name
            && !city
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const cityId = city
            ? city.id
            : null;

        const newFilterOptions = new SearchOptions(name, cityId);

        props.onFilterApply(newFilterOptions);
    }

    function onNameChanged(event) {
        if (!event.target.value) {
            changeName(null);
        }

        changeName(event.target.value);
    }

    async function getCityName(city) {
        const country = await PlaceService.getCountryById(city.countryId);

        const finalName = `${city.name} (${country.name})`;

        return finalName;
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    hideFunc={changeMessageBoxValue}
                    message={messageBoxValue}
                />
            );
        }
    }

    return (
        <div className="filter-body">
            {showMessageBox()}
            <ComponentHeadline content="Filter"/>
            <div className="filter-row">
                <div className="filter-arg">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={onNameChanged}
                    />
                </div>
            </div>

            <div className="filter-row">
                <div className="filter-arg">
                    <SearchList
                        searchFunc={PlaceService.searchCitiesByName}
                        placeholder="City"
                        currentItem={city}
                        getItemName={getCityName}
                        onValueChange={changeCity}
                    />
                </div>

                <button className="filter-apply rounded" onClick={onFilterApply}>
                    apply
                </button>
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}