import React, {useState, useEffect} from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';

import Country from '../../../../services/place-models/country';
import {  duplicate, defaultErrorMessage, invalidInput, saved } from '../../../common/message-box-messages';

import * as CountryService from '../../../../services/CountryService';
import { NotFoundError, BadRequestError } from '../../../../services/RequestErrors';
import ConfirmActionButton from '../../../common/confirm-action-button';

export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [name, changeName] = useState();
    const [id, changeId] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countryRequest = await CountryService.getCountryById(props.match.params.id);

                changeName(countryRequest.name);
                changeId(countryRequest.id);
                changeLoadingMode(false);
            } catch (ex) {
                if (ex instanceof NotFoundError) {
                    props.history.push('/not-found');
                } else {
                    changeMessageBoxValue(defaultErrorMessage());
                }
            }
        }
        fetchData();
    }, [props.match.params.id]);

    async function onDataSave() {
        if (!name) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        let finalCountry = new Country(id, name);
        
        try {
            await CountryService.updateCountry(finalCountry);
            changeMessageBoxValue(saved());
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(name));
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
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

    if (loading) {
        return (
            <div className="list-item-action rounded editing">
                {showMessageBox()}
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="list-item-action rounded editing">
            <Headline name="Editing country"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="country-name">Country name</label>
                                    <input
                                        id="country-name"
                                        type="text"
                                        onChange={(event) => changeName(event.target.value)}
                                        value={name}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmActionButton onClick={onDataSave} buttonContent="Save"/>
            </div>
            {showMessageBox()}
        </div>
    );
}