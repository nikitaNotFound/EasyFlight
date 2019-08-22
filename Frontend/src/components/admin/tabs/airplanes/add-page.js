import React, {useState} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SeatEditor from './seat-editor';

function Adding () {
    const [airplane, changeAirplane] = useState({name: '', maxMass: ''});

    function onDataSave (data) {
        data.push(airplane);
        //HERE WILL BE HTTP REQUEST TO API
        if (data === undefined) {
            return;
        }
        
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

    return (
        <div className="list-item-action adding">
            <Headline name="Adding new airplane"/>

            <form method="post" className="adding-form">
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
                                <input type="text" onChange={onAirplaneNameChange} value={airplane.name}/>
                            </div>
                            <div className="form-item">
                                <div className="label">Max mass</div>
                                <input onChange={onMassMaxChange} value={airplane.maxMass}/>
                            </div>
                        </div>
                        <br/>
                        <SeatEditor onDataSave={onDataSave}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Adding;