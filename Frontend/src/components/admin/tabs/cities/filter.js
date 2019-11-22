import React, {useState} from 'react';
import PropsTypes from 'prop-types';

import SearchOptions from '../../../../services/airport-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';
import ConfirmActionButton from '../../../common/confirm-action-button';

import * as CountryService from '../../../../services/CountryService';

export default function Filter(props) {
    const [name, changeName] = useState(props.filterOptions.name);
    const [country, changeCountry] = useState(null);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!country && !name) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const countryId = country
            ? country.id
            : null;

        props.onFilterApply({name: name, countryId: countryId});
    }

    function onNameChanged(event) {
        if (!event.target.value) {
            changeName(null);
        }

        changeName(event.target.value);
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

    function getCountryName(country) {
        return country.name;
    }

    return (
        <div className="filter-body">
            {showMessageBox()}
            <ComponentHeadline content="Filter"/>
            <div className="filter-row">
                <div className="filter-arg">
                    <SearchList
                        searchFunc={CountryService.searchByName}
                        placeholder="Country"
                        getItemName={getCountryName}
                        onValueChange={changeCountry}
                        currentItem={country}
                    />
                </div>
            </div>
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
            <ConfirmActionButton onClick={onFilterApply} buttonContent="Search"/>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}