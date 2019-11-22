import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';
import ConfirmActionButton from '../../../common/confirm-action-button';

import SearchOptions from '../../../../services/airport-models/search-options';
import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';
import ParamField from '../../../common/param-field';

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

    async function buildCityName(city) {
        const country = await CountryService.getById(city.countryId);

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
                    <ParamField
                        name="Name"
                        value={name}
                        onChange={changeName}
                        inputType="text"
                    />
                </div>
            </div>

            <div className="filter-row">
                <div className="filter-arg">
                    <SearchList
                        searchFunc={CityService.searchByName}
                        placeholder="City"
                        currentItem={city}
                        getItemName={buildCityName}
                        onValueChange={changeCity}
                    />
                </div>

                <ConfirmActionButton onClick={onFilterApply} buttonContent="Search"/>
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}