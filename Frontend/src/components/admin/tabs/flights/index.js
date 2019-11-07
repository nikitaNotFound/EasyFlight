import React, {useState} from 'react';
import AddButton from '../../../common/add-button';
import Flights from './flights';
import * as FlightService from '../../../../services/FlightService';
import SearchOptions from '../../../../services/flight-models/search-options';
import Filter from './filter';
import MessageBox from '../../../common/message-box';
import { defaultErrorMessage } from '../../../common/message-box-messages';

export default function FlightList() {
    const [flights, changeFlights] = useState([]);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState();

    async function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        try {
            const foundFlights = await FlightService.searchWithParams(newFilterOptions);
            changeFlights(foundFlights);
        } catch {
            changeMessageBoxValue(defaultErrorMessage());
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
            <AddButton catalog="flights"/>
            <Flights flights={flights}/>
        </div>
    );
}