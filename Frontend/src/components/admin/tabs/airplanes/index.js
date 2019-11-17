import React, { useState } from 'react';

import SearchOptions from '../../../../services/airplane-models/search-options';

import * as AirplaneService from '../../../../services/AirplaneService';

import Airplanes from './airplanes';
import Filter from './filter';
import AddButton from '../../../common/add-button';
import MessageBox from '../../../common/message-box';
import { defaultErrorMessage } from '../../../common/message-box-messages';
import ItemsPageSwitcher from '../../../common/items-page-switcher';

export default function AirplaneList() {
    const [filterOptions, changeFilterOptions] = useState(new SearchOptions());
    const [airplanes, changeAirplanes] = useState(null);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    const [currentPage, changeCurrentPage] = useState(1);
    const PAGE_LIMIT = 2;
    const [totalItemsCount, changeTotalItemsCount] = useState(null);

    async function onFilterApply(newFilterOptions, newCurrentPage = currentPage) {
        newFilterOptions.currentPage = newCurrentPage;
        newFilterOptions.pageLimit = PAGE_LIMIT;
        changeFilterOptions(newFilterOptions);

        try {
            const airplanes = await AirplaneService.searchWithParams(newFilterOptions);
            changeTotalItemsCount(airplanes.totalItemsCount);
            changeAirplanes(airplanes.content);
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
        if (airplanes && airplanes.length > 0) {
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
        <div className="tab-content">
            {showMessageBox()}
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="airplanes"/>
            <Airplanes airplanes={airplanes}/>
            {showItemsPageSwitcher()}
        </div>
    );
}