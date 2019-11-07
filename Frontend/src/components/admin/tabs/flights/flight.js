import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import moment from 'moment';

import FlightHeadline from './flight-headline';
import Spinner from '../../../common/spinner';
import EditButton from '../../../common/edit-button';

import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';
import * as AirportService from '../../../../services/AirportService';

function Flight(props) {
    const [loading, changeLoading] = useState(true);

    const [fromAirport, changeFromAirport] = useState();
    const [fromCity, changeFromCity] = useState();
    const [fromCountry, changeFromCountry] = useState();

    const [toAirport, changeToAirport] = useState();
    const [toCity, changeToCity] = useState();
    const [toCountry, changeToCountry] = useState();

    useEffect(() => {
        const fromAirportLoading = AirportService.getById(props.flight.fromAirportId);
        const toAirportLoading = AirportService.getById(props.flight.toAirportId);

        Promise.all([fromAirportLoading, toAirportLoading])
            .then(airports => {
                const [fromAirport, toAirport] = airports;

                changeFromAirport(fromAirport);
                changeToAirport(toAirport);

                const fromCityLoading = CityService.getById(fromAirport.cityId);
                const toCityLoading = CityService.getById(toAirport.cityId);

                return Promise.all([fromCityLoading, toCityLoading]);
            })
            .then(cities => {
                const [fromCity, toCity] = cities;

                changeFromCity(fromCity);
                changeToCity(toCity);

                const fromCountryLoading = CountryService.getById(fromCity.countryId);
                const toCountryLoading = CountryService.getById(toCity.countryId);

                return Promise.all([fromCountryLoading, toCountryLoading]);
            })
            .then(countries => {
                const [fromCountry, toCountry] = countries;

                changeFromCountry(fromCountry);
                changeToCountry(toCountry);
                changeLoading(false);
            })
            .catch();
    }, [props.flight.fromAirportId, props.flight.toAirportId]);

    if (loading) {
        return <Spinner headline="Loading..." />;
    }

    return (
        <div className="rounded list-item">
            <div className="row">
                <div className="col-lg-11 col-sm-12">
                    <FlightHeadline
                        from={`${fromAirport.name} (${fromCity.name}, ${fromCountry.name})`}
                        to={`${toAirport.name} (${toCity.name}, ${toCountry.name})`}
                    />
                    {props.flight.desc}
                </div>

                <div className="col-lg-1 col-sm-12">
                    <EditButton categoty="flights" editingItemId={props.flight.id}/>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    {moment(props.flight.departureTime).format('LLL')}
                </div>
                <div className="col-6">
                    {moment(props.flight.arrivalTime).format('LLL')}
                </div>
            </div>
        </div>
    );
}

Flight.propsTypes = {
    flight: PropsTypes.instanceOf(Flight),
    onEdit: PropsTypes.func,
    displayLayout: PropsTypes.func
};

export default Flight;
