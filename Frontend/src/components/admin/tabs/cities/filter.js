import React, {useState} from 'react';
import PropsTypes from 'prop-types';

import SearchOptions from '../../../../services/airport-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';

import * as PlaceService from '../../../../services/PlaceService';


export default function Filter(props) {
    const [name, changeName] = useState(props.filterOptions.name);
    const [country, changeCountry] = useState(null);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!name || !country) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        props.onFilterApply({name: name, countryId: country.id});
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
                        searchFunc={PlaceService.searchCountries}
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
                        getItemName={getCountryName}
                        onValueChange={changeCountry}
                    />
                </div>
            </div>
            <div className="filter-apply rounded" onClick={onFilterApply}>
                apply
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}