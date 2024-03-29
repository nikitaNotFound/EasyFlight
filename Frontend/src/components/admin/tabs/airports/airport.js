import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import AirportHeadline from './airport-headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';
import EditButton from '../../../common/edit-button';

import AirportObject from '../../../../services/airport-models/airport';

import * as CityService from '../../../../services/CityService';
import * as CountryService from '../../../../services/CountryService';
import { defaultErrorMessage } from '../../../common/message-box-messages';

export default function Airport(props) {
    const [loading, changeLoading] = useState(true);
    const [city, changeCity] = useState();
    const [counrty, changeCountry] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const city = await CityService.getById(props.airport.cityId);
                changeCity(city.name);

                const country = await CountryService.getById(city.countryId);
                changeCountry(country.name);

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
        <div className="row rounded list-item">
            {showMessageBox()}
            <div className="col-lg-10 col-sm-12">
                <AirportHeadline
                    name={props.airport.name}
                    location={`${city}, ${counrty}`}
                />
                {props.desc}
            </div>

            <div className="col-lg-2 col-sm-12">
                <EditButton categoty="airports" editingItemId={props.airport.id}/>
            </div>
        </div>
    );
}

Airport.propsTypes = {
    airport: PropsTypes.instanceOf(AirportObject),
}