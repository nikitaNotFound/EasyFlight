import React, {useState} from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';
import SearchOptions from '../../services/flight-models/search-options';
import * as FlightService from '../../services/FlightService';
import '../../styles/flight-list.scss';
import MessageBox from '../common/message-box';
import { defaultErrorMessage } from '../common/message-box-messages';
import ItemsPageSwitcher from '../common/items-page-switcher';
import * as config from '../../config.json';

function Content() {
    const [flights, changeFlights] = useState(null);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState();

    const [totalItemsCount, changeTotalItemsCount] = useState(null);
    const [currentPage, changeCurrentPage] = useState(1);
    const PAGE_LIMIT = config.DEFAULT_PAGE_LIMIT;

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

    async function onFilterApply(searchOptions, newCurrentPage = 1, swapFilter = true) {
        searchOptions.currentPage = newCurrentPage;
        searchOptions.pageLimit = PAGE_LIMIT;
        changeFilterOptions(searchOptions);

        try {
            const foundFlights = await FlightService.searchWithParams(searchOptions);
            changeTotalItemsCount(foundFlights.totalItemsCount);
            changeFlights(foundFlights.content);
            if (swapFilter === true){
                swapFilterList();
            }
        } catch {
            changeMessageBoxValue(defaultErrorMessage());
        }
    }

    function onNext() {
        changeCurrentPage(currentPage + 1);
        onFilterApply(filterOptions, currentPage + 1, false);
    }

    function onPervious() {
        changeCurrentPage(currentPage - 1);
        onFilterApply(filterOptions, currentPage - 1, false);
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

    function showItemsPageSwitcher() {
        // if search started and gave a result
        if (flights && flights.length > 0) {
            return (
                <ItemsPageSwitcher
                    currentPage={currentPage}
                    onNext={onNext}
                    onPervious={onPervious}
                    pageLimit={PAGE_LIMIT}
                    totalItemsCount={totalItemsCount}
                />
            );
        }
    }

    return (
        <main className={`rounded ${mode}`}>
            {showMessageBox()}
            <Switcher switcher={swapFilterList} value={switcherValue}/>
            <Flights flights={flights}/>
            {showItemsPageSwitcher()}
            <Filter
                onFilterApplied={onFilterApply}
                filterOptions={filterOptions}
            />
        </main>
    );
}

export default Content;