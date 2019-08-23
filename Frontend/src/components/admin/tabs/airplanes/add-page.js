import React, {useState} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SeatEditor from './seat-editor';
import Airplane from '../../../../services/airplane-models/airplane';

function Adding () {
    const [airplaneName, changeAirplaneName] = useState('');
    const [airplaneMaxMass, changeAirplaneMaxMass] = useState(0);

    function onDataSave (data) {
        data.push(new Airplane(airplaneName, airplaneMaxMass, data));
        //HERE WILL BE HTTP REQUEST TO API
    }

    function onAirplaneNameChange (event) {
        changeAirplaneName(event.target.value);
    }

    function onMassMaxChange (event) {
        const newMaxMass = Number(event.target.value);
        if (newMaxMass > 0) {
            changeAirplaneMaxMass(newMaxMass);
        }
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
                                <input type="text" onChange={onAirplaneNameChange} value={airplaneName}/>
                            </div>
                            <div className="form-item">
                                <div className="label">Max mass</div>
                                <input onChange={onMassMaxChange} value={airplaneMaxMass}/>
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