import React, { useState } from 'react';

import SearchOptions from '../../../../services/airplane-models/search-options';

import * as AirplaneService from '../../../../services/AirplaneService';

import Airplanes from './airplanes';
import Filter from './filter';
import AddButton from '../../../common/add-button';
import MessageBox from '../../../common/message-box';

export default function AirplaneList() {
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [airplanes, changeAirplanes] = useState(null);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        try {
            const airplanes = await AirplaneService.searchWithParams(newFilterOptions);
            changeAirplanes(airplanes);
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
            <AddButton catalog="airplanes"/>
            <Airplanes airplanes={airplanes}/>
        </div>
    );
}