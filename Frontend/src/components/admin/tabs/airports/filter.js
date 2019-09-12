import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import SearchOptions from '../../../../services/airport-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import SearchList from '../../../common/search-list';
import * as PlaceService from '../../../../services/PlaceService';

function Filter(props) {
    const [name, changeName] = useState(props.filterOptions.name);
    const [country, changeCountry] = useState(props.filterOptions.country);
    const [city, changeCity] = useState(props.filterOptions.city);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!name
            && !country
            && !city
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const newFilterOptions = new SearchOptions(name, country, city);

        props.onFilterApply(newFilterOptions);
    }

    function onNameChanged(event) {
        if (!event.target.value) {
            changeName(null);
        }

        changeName(event.target.value);
    }

    function getCountryName(country) {
        return country.name;
    }

    function getCityName(city) {
        return city.name;
    }

    function showCityChooser() {
        if (country) {
            return (
                <div className="filter-arg">
                    <SearchList
                        searchFunc={PlaceService.searchCities}
                        searchArgs={[country.id]}
                        placeholder="City"
                        currentItem={city}
                        getItemName={getCityName}
                        onValueChange={changeCity}
                    />
                </div>
            );
        }
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return <MessageBox
                        hideFunc={changeMessageBoxValue}
                        message={messageBoxValue}
                    />
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
                        searchFunc={PlaceService.searchCountries}
                        placeholder="Country"
                        currentItem={country}
                        getItemName={getCountryName}
                        onValueChange={changeCountry}
                    />
                </div>

                {showCityChooser()}

                <div className="filter-apply rounded" onClick={onFilterApply}>
                    apply
                </div>
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}

export default Filter;