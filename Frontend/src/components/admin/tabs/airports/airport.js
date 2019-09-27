import React, {useState, useEffect} from 'react';
import AirportHeadline from './airport-headline';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../../common/spinner';
import AirportObject from '../../../../services/airport-models/airport';
import * as PlaceService from '../../../../services/PlaceService';

function Airport(props) {
    const [loading, changeLoading] = useState(true);

    const [city, changeCity] = useState();
    const [counrty, changeCountry] = useState();

    useEffect(() => {
        const cityLoading = PlaceService.getCityById(props.airport.cityId);

        cityLoading
            .then(foundCity => {
                changeCity(foundCity.name);

                return PlaceService.getCountryById(foundCity.countryId);
            })
            .then(foundCountry => {
                changeCountry(foundCountry.name);
                changeLoading(false);
            })
            .catch();
    }, [props.airport.id]);

    if (loading) {
        return <Spinner headline="Receiving information about airport..."/>
    }

    return (
        <div className="row rounded list-item">
            <div className="col-lg-2 col-sm-3">
                <img src="" className="list-item-img" alt="airport"/>
            </div>

            <div className="col-lg-9 col-sm-9">
                <AirportHeadline
                    name={props.airport.name}
                    location={`${city}, ${counrty}`}
                />
                {props.desc}
            </div>

            <div className="col-lg-1 col-sm-12">
                <Link to={`/admin/airports/edit/${props.airport.id}`}>
                    <div className="edit-button rounded non-selectable">
                        Edit
                    </div>
                </Link>
            </div>
        </div>
    );
}

Airport.propsTypes = {
    airport: PropsTypes.instanceOf(AirportObject),
}

export default Airport;