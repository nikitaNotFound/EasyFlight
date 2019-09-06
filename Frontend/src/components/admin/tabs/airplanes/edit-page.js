import React, {useState, useEffect} from 'react';
import Headline from '../../../common/headline';
import MessageBox from '../../../common/message-box';
import SeatEditor from './seat-editor';
import Spinner from '../../../common/spinner';
import Airplane from '../../../../services/airplane-models/airplane';
import * as AirplaneService from '../../../../services/AirplaneService';

function Edit(props) {
    const [loading, changeLoading] = useState(true);

    const [id, changeId] = useState();
    const [name, changeName] = useState('');
    const [maxMass, changeMaxMass] = useState(0);
    const [seats, changeSeats] = useState();
    const [seatTypes, changeSeatTypes] = useState();

    const [messageBoxValue, changeMessageBoxValue] = useState();

    // reciving info about airplane with id getted from url
    useEffect(() => {
        const airplaneLoading = AirplaneService.getById(props.match.params.id);
        airplaneLoading
            .then(airplane => {
                changeId(airplane.id);
                changeName(airplane.name);
                changeMaxMass(airplane.maxMass);
                changeSeatTypes(airplane.seatTypes);
                changeSeats(airplane.seats);
                changeLoading(false);
            })
            .catch(error => {
                onDataFail(error);
            });
    }, [props.match.params.id]);

    function onDataFail(error) {
        alert(error);
    }

    function onDataSave() {
        if (!name
            || !maxMass
            || !seats
            || !seatTypes
        ) {
            changeMessageBoxValue('Input data is not valid');
            return;
        }

        const finalAirplane = new Airplane(id, name, maxMass, seats, seatTypes);
    }

    function onMaxMassChange(event) {
        const newMaxMass = Number(event.target.value);
        if (newMaxMass > 0) {
            changeMaxMass(newMaxMass);
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

    if (!loading) { 
        return (
            <div className="list-item-action editing">
                <Headline name="Editing airplane"/>

                <div className="row">
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label htmlFor="airplane-name">
                                        Airplane name
                                    </label>
                                    <input
                                        id="airplane-name"
                                        type="text"
                                        value={name}
                                        onChange={(event) => changeName(event.target.value)}
                                    />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="airplane-max-mass">
                                        Max mass
                                    </label>
                                    <input
                                        id="airplane-max-mass"
                                        value={maxMass}
                                        onChange={onMaxMassChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <SeatEditor 
                            seatInfo={seats}
                            seatTypes={seatTypes}
                            onSeatsChange={changeSeats}
                            onSeatTypesChange={changeSeatTypes}
                        />
                    </div>
                </div>
                <div className="custom-button big" onClick={onDataSave}>Save</div>
                {showMessageBox()}
            </div>
        );
    }

    return <Spinner headline="Loading..."/>
}

export default Edit;