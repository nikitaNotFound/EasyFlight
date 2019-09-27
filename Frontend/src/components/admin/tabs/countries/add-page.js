import React, { useState } from 'react';

import Headline from '../../../common/headline';
import Spinner from '../../../common/spinner';
import MessageBox from '../../../common/message-box';

import Country from '../../../../services/place-models/country';


export default function Edit(props) {
    const [name, changeName] = useState();
    
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onDataSave() {
        if (!name) {
            changeMessageBoxValue('Input data is not valid!');
            return;
        }

        let newAirport = new Country(null, name);
        // HERE WILL BE HTTP REQUEST
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
        <div className="list-item-action rounded editing">
            <Headline name="Editing country"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airport-name">Country name</label>
                                    <input
                                        id="airport-name"
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