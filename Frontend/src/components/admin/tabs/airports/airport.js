import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AirportHeadline from './airport-headline';
import Spinner from '../../../common/spinner';

import AirportObject from '../../../../services/airport-models/airport';

import * as PlaceService from '../../../../services/PlaceService';
import { defaultErrorMessage } from '../../../common/message-box-messages';

export default function Airport(props) {
    const [loading, changeLoading] = useState(true);
    const [city, changeCity] = useState();
    const [counrty, changeCountry] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityResult = await PlaceService.getCityById(props.airport.cityId);
                changeCity(cityResult.name);

                const countryResult = await PlaceService.getCountryById(cityResult.countryId);
                changeCountry(countryResult.name);

                changeLoading(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
        fetchData();
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
                    <div className="button edit-button rounded non-selectable">
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