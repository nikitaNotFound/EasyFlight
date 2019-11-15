import React, {useState} from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';
import SearchOptions from '../../services/flight-models/search-options';
import * as FlightsService from '../../services/FlightService';
import '../../styles/flight-list.scss';
import MessageBox from '../common/message-box';
import { defaultErrorMessage } from '../common/message-box-messages';

function Content() {
    const [flights, changeFlights] = useState(null);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState();

    const layoutMode = {
        List: 'list-only',
        Filter: 'filter-only'
    };

    const switcherValues = {
        OnFilter: 'Flights',
        OnList: 'Filter'
    }

    const [mode, changeMode] = useState(layoutMode.Filter);
    const [switcherValue, changeSwitcherValue] = useState(switcherValues.OnFilter);

    function swapFilterList() {
        const newMode = mode === layoutMode.List
            ? layoutMode.Filter
            : layoutMode.List;

        const newSwitcherValue = switcherValue === switcherValues.OnFilter
            ? switcherValues.OnList
            : switcherValues.OnFilter

        changeSwitcherValue(newSwitcherValue);
        changeMode(newMode);
    }

    async function onFilterApplied(searchOptions) {
        changeFilterOptions(searchOptions);

        try {
            const flights = await FlightsService.searchWithParams(searchOptions);
            changeFlights(flights);
            swapFilterList();
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
        <main className={`rounded ${mode}`}>
            {showMessageBox()}
            <Switcher switcher={swapFilterList} value={switcherValue}/>
            <Flights flights={flights}/>
            <Filter
                onFilterApplied={onFilterApplied}
                filterOptions={filterOptions}
            />
        </main>
    );
}

export default Content;