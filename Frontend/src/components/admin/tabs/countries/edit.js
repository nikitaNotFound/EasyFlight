import React, {useState, useEffect} from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';

import Country from '../../../../services/place-models/country';

import * as PlaceService from '../../../../services/PlaceService';


export default function Edit(props) {
    const [loading, changeLoadingMode] = useState(true);
    const [name, changeName] = useState();
    const [id, changeId] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const countryRequest = await PlaceService.getCountryById(props.match.params.id);

            if (countryRequest.successful === true) {
                changeName(countryRequest.value.name);
                changeId(countryRequest.value.id);
                changeLoadingMode(false);
            } else {
                changeMessageBoxValue(countryRequest.value);
            }
            
        }
        fetchData();
    }, [props.match.params.id]);

    async function onDataSave() {
        if (!name) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let finalCountry = new Country(id, name);
        
        const updateResult = await PlaceService.updateCountry(finalCountry);

        if (updateResult.successful === true) {
            changeMessageBoxValue('Updated!');
        } else {
            changeMessageBoxValue(updateResult.value);
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
                <div className="custom-button big" onClick={onDataSave}>Save</div>
            </div>
            {showMessageBox()}
        </div>
    );
}