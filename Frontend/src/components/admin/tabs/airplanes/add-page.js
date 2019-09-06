import React, {useState} from 'react';
import Headline from '../../../common/headline';
import SeatEditor from './seat-editor';
import MessageBox from '../../../common/message-box';
import Airplane from '../../../../services/airplane-models/airplane';

function Adding() {
    const [name, changeName] = useState('');
    const [maxMass, changeMaxMass] = useState(0);
    const [seats, changeSeats] = useState();
    const [seatTypes, changeSeatTypes] = useState();

    const [messageBoxValue, changeMessageBoxValue] = useState();

    function onDataSave(data) {
        if (!name 
            || !maxMass
            || !seats
            || !seatTypes
        ) {
            changeMessageBoxValue('Input data is not valid');
            return;
        }

        const newAirplane = new Airplane(null, name, maxMass, seats, seatTypes);
    }

    function onNameChange(event) {
        changeName(event.target.value);
    }

    function onMassMaxChange(event) {
        const newMaxMass = Number(event.target.value);
        if (newMaxMass > 0) {
            changeMaxMass(newMaxMass);
        }
    }

    function onSeatsChange(newSeats) {
        changeSeats(newSeats);
    }

    function onSeatTypesChange(newSeatTypes) {
        changeSeatTypes(newSeatTypes);
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox message={messageBoxValue} hideFunc={hideMessageBox}/>
            );
        }
    }

    function hideMessageBox() {
        changeMessageBoxValue(null);
    }

    return (
        <div className="list-item-action adding">
            <Headline name="Adding new airplane"/>

            <div className="adding-form">
                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airplane-name">Airplane name</label>
                                    <input type="text" id="airplane-name" onChange={onNameChange} value={name}/>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="airplane-max-mass">Max mass</label>
                                    <input id="airplane-max-mass" onChange={onMassMaxChange} value={maxMass}/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <SeatEditor 
                            onSeatsChange={onSeatsChange}
                            onSeatTypesChange={onSeatTypesChange}/>
                    </div>
                </div>
            </div>
            <div className="custom-button big" onClick={onDataSave}>Save</div>
            {showMessageBox()}
        </div>
    );
}

export default Adding;