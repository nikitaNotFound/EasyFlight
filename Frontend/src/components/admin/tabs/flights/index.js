import React, {useState} from 'react';
import AddButton from '../../../common/add-button';
import Flights from './flights';
import * as FlightService from '../../../../services/FlightService';
import SearchOptions from '../../../../services/flight-models/search-options';
import Filter from './filter';
import MessageBox from '../../../common/message-box';
import { defaultErrorMessage } from '../../../common/message-box-messages';
import ItemsPageSwitcher from '../../../common/items-page-switcher';

export default function FlightList() {
    const [flights, changeFlights] = useState(null);
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [messageBoxValue, changeMessageBoxValue] = useState();

    const [totalItemsCount, changeTotalItemsCount] = useState(null);
    const [currentPage, changeCurrentPage] = useState(1);

    async function onFilterApply(newFilterOptions, newCurrentPage = 1) {
        console.log(newFilterOptions);
        newFilterOptions.currentPage = newCurrentPage;
        changeFilterOptions(newFilterOptions);

        try {
            const foundFlights = await FlightService.searchWithParams(newFilterOptions);
            changeTotalItemsCount(foundFlights.totalItemsCount);
            changeFlights(foundFlights.content);
        } catch {
            changeMessageBoxValue(defaultErrorMessage());
        }
    }

    function onNext() {
        changeCurrentPage(currentPage + 1);
        onFilterApply(filterOptions, currentPage + 1);
    }

    function onPervious() {
        changeCurrentPage(currentPage - 1);
        onFilterApply(filterOptions, currentPage - 1);
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
                    totalItemsCount={totalItemsCount}
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
            {showItemsPageSwitcher()}
        </div>
    );
}