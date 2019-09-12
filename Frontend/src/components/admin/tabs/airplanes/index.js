import React, {useState} from 'react';
import AddButton from '../../../common/add-button';
import Airplanes from './airplanes';
import * as AirplaneService from '../../../../services/AirplaneService';
import Spinner from '../../../common/spinner';
import Filter from './filter';
import SearchOptions from '../../../../services/airplane-models/search-options';

function getEmptyFilterOptions() {
    return new SearchOptions(
        null,
        null,
        null,
        null,
        null
    );
}

function AirplanePage() {
    const [filterOptions, changeFilterOptions] = useState(getEmptyFilterOptions());
    const [airplanes, changeAirplanes] = useState([]);

    function onFilterApply(newFilterOptions) {
        changeFilterOptions(newFilterOptions);

        const flightsLoading = AirplaneService.searchWithParams(newFilterOptions);

        flightsLoading
            .then(foundAirplanes => {
                changeAirplanes(foundAirplanes);
            })
            .catch(error => {
                alert(error);
            });
    }

    return (
        <div className="tab-content">
            <Filter filterOptions={filterOptions} onFilterApply={onFilterApply}/>
            <AddButton catalog="airplanes"/>
            <Airplanes airplanes={airplanes}/>
        </div>
    );
}

export default AirplanePage;