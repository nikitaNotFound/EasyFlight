import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SeatEditor from './seat-editor';
import Spinner from '../../../common/spinner';
import * as AirplaneService from '../../../../services/AirplaneService';

function Edit (props) {
    const [isLoading, changeLoadingMode] = useState(true);
    const [airplane, changeAirplane] = useState();

    /****************************************EVENTS********************************************************/
    //reciving info about airplane with id getted from url
    useEffect(() => {
        const airplaneLoading = AirplaneService.getById(props.match.params.id);
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

    /****************************************RENDER********************************************************/
    if (!isLoading) { 
        return (
            <div className="list-item-action editing">
                <Headline name="Editing airplane"/>

                <div className="row">
                    <div className="col-2">
                        <input type="file" name="image" id="file-input" className="file-upload"/>
                        <label htmlFor="file-input">
                            <img src={AddIcon} className="adding-form-img" alt="add"/>
                        </label>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="form-item">
                                <div className="label">Airplane name</div>
                                <input type="text" value={airplane.name} onChange={onAirplaneNameChange} name="name"/>
                            </div>
                            <div className="form-item">
                                <div className="label">Max mass</div>
                                <input value={airplane.maxMass} onChange={onMassMaxChange}/>
                            </div>
                        </div>
                        <br/>
                        <SeatEditor seatInfo={airplane.seats} onDataSave={onDataSave}/>
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