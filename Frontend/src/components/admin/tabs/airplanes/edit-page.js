import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import SeatEditor from './seat-editor';
import Spinner from '../../../common/spinner';
import * as AirplaneService from '../../../../services/AirplaneService';

function Edit (props) {
    const [loading, changeLoadingMode] = useState(true);
    const [airplane, changeAirplane] = useState();

    //reciving info about airplane with id getted from url
    useEffect(() => {
        const airplaneLoading = AirplaneService.getAirplaneById(props.match.params.id);
        airplaneLoading
            .then(data => {
                onDataSuccessful(data);
            })
            .catch(error => {
                onDataFail(error);
            });
    }, []);

    function onDataSuccessful (airplane) {
        changeAirplane(airplane);
        changeLoadingMode(false);
    }

    function onDataFail (error) {
        alert(error);
    }

    //calls when user press save info
    function onDataSave (data) {
        data.push(airplane);
        //HERE WILL BE HTTP REQUEST TO API
        console.log(data);
    }

    function onAirplaneNameChange (event) {
        const storage = {};
        Object.assign(storage, airplane);

        storage.name = event.target.value;
        changeAirplane(storage);
    }

    function onMassMaxChange (event) {
        const storage = {};
        Object.assign(storage, airplane);

        const newMaxMass = Number(event.target.value);
        if (newMaxMass > 0) {
            storage.maxMass = event.target.value;
        }

        changeAirplane(storage);
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
                                    <label htmlFor="airplane-name">Airplane name</label>
                                    <input id="airplane-name" type="text" value={airplane.name} onChange={onAirplaneNameChange} name="name"/>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="airplane-max-mass">Max mass</label>
                                    <input id="airplane-max-mass" value={airplane.maxMass} onChange={onMassMaxChange}/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <SeatEditor 
                            seatInfo={airplane.seats}
                            seatTypes={airplane.seatTypes}
                            onDataSave={onDataSave}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Spinner/>
    );
}

export default Edit;