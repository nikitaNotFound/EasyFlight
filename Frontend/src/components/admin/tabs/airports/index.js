import React, { useState } from 'react';

import AddButton from '../../../common/add-button';
import Airports from './airports';
import Filter from './filter';
import MessageBox from '../../../common/message-box';

import * as AirportService from '../../../../services/AirportService';

import SearchOptions from '../../../../services/airport-models/search-options';

export default function AirportList() {
    const [airports, changeAirports] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());

    const [messageBoxValue, changeMessageBoxValue] = useState();

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const airportsResult = await AirportService.search(newFilterOptions);
        if (airportsResult.successful === true) {
            changeAirports(airportsResult.value);
        } else {
            changeMessageBoxValue(airportsResult.value);
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
            <AddButton catalog="airports"/>
            <Airports airports={airports}/>
        </div>
    );
}