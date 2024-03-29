import React, {useState, useEffect} from 'react';
import buyIcon from '../../../icons/buy-icon.png';
import PropsTypes from 'prop-types';
import Spinner from '../../common/spinner';
import FlightObject from '../../../services/flight-models/flight';
import * as AirportService from '../../../services/AirportService';
import * as CityService from '../../../services/CityService';
import * as CountryService from '../../../services/CountryService';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
            .catch(error => {
                alert(error);
            });
    }, [props.flight]);


    if (loading) {
        return <Spinner headline="Loading..."/>
    }

    return (
        <div className="row list-item rounded">
            <div className="col-sm-10" name="item-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <h5>
                                From: {`${fromAirport.name} (${fromCity.name}, ${fromCountry.name})`}
                            </h5>
                        </div>
                        <div className="col-6">
                            <h5>
                                To: {`${toAirport.name} (${toCity.name}, ${toCountry.name})`}
                            </h5>
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

                <div className="container-fluid">
                    {props.flight.desc}
                </div>
            </div>
            <div className="col-sm-2" name="item-buy">
                <Link to={`/booking/${props.flight.id}`} target="_blank" className="non-dec-link">
                    <div className="btn btn-primary button-buy">
                        <img src={buyIcon} alt="icon-book"/>
                        Book
                    </div>
                </Link>
            </div>
        </div>
    );
}

Flight.propsTypes = {
    flight: PropsTypes.instanceOf(FlightObject)
}

export default Flight;