import React, {useState, useEffect} from 'react';
import FlightHeadline from './flight-headline';
import PropsTypes from 'prop-types';
import Spinner from '../../../common/spinner';
import { Link } from 'react-router-dom';
import FlightObject from '../../../../services/flight-models/flight';
import * as PlaceService from '../../../../services/PlaceService';
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
        const fromAirportLoading = AirportService.getById(props.flight.fromId);
        const toAirportLoading = AirportService.getById(props.flight.toId);

        Promise.all([fromAirportLoading, toAirportLoading])
            .then(airports => {
                const [fromAirport, toAirport] = airports;

                changeFromAirport(fromAirport);
                changeToAirport(toAirport);

                const fromCityLoading = PlaceService.getCityById(fromAirport.cityId);
                const toCityLoading = PlaceService.getCityById(toAirport.cityId);

                return Promise.all([fromCityLoading, toCityLoading]);
            })
            .then(cities => {
                const [fromCity, toCity] = cities;

                changeFromCity(fromCity);
                changeToCity(toCity);

                const fromCountryLoading = PlaceService.getCountryById(fromCity.countryId);
                const toCountryLoading = PlaceService.getCountryById(toCity.countryId);

                return Promise.all([fromCountryLoading, toCountryLoading]);
            })
            .then(countries => {
                const [fromCountry, toCountry] = countries;

                changeFromCountry(fromCountry);
                changeToCountry(toCountry);
                changeLoading(false);
            })
            .catch();
    }, [props.flight]);

    if (loading) {
        return <Spinner headline="Loading..."/>
    }

    return (
        <div className="row rounded list-item">
            <div className="col-lg-2 col-sm-3">
                <img src="" className="list-item-img" alt="airport"/>
            </div>

            <div className="col-lg-9 col-sm-9">
                <FlightHeadline 
                    from={`${fromAirport.name} (${fromCity.name}, ${fromCountry.name})`}
                    to={`${toAirport.name} (${toCity.name}, ${toCountry.name})`}
                />
                {props.flight.desc}
            </div>

            <div className="col-lg-1 col-sm-12">
                <Link to={`/admin/flights/edit/${props.flight.flightId}`}>
                    <div className="edit-button rounded non-selectable">
                        Edit
                    </div>
                </Link>
            </div>
        </div>
    );
}

Flight.propsTypes = {
    flight: PropsTypes.instanceOf(Flight),
    onEdit: PropsTypes.func,
    displayLayout: PropsTypes.func
}

export default Flight;