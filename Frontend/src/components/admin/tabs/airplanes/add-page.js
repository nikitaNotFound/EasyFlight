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
                    <div className="col-12">
                        <div className="editing-params-form">
                            <div className="row">
                                <div className="form-item">
                                    <label>Airplane name</label>
                                    <input type="text" onChange={onAirplaneNameChange} value={airplaneName}/>
                                </div>
                                <div className="form-item">
                                    <label>Max mass</label>
                                    <input onChange={onMassMaxChange} value={airplaneMaxMass}/>
                                </div>
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