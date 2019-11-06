import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import { isNumber } from 'util';

function Instruments(props) {
    const [floor, changeFloor] = useState();
    const [section, changeSection] = useState();

    function onFloorChange(event) {
        const newValue = event.target.value < 0
            ? 0
            : Number(event.target.value);
        changeFloor(newValue);
    }

    function onSectionChange(event) {
        const newValue = event.target.value < 0
            ? 0
            : Number(event.target.value);
        changeSection(newValue);
    }

    function onAddZone() {
        if (isNumber(floor) && isNumber(section) && floor > 0 && section > 0) {
            props.onAddZone(floor, section);
        }
    }

    return (
        <div className="seat-editor-instruments">
            <div className="row">
                <div className="form-item">
                    <label htmlFor="floor-pos">Floor</label>
                    <input id="floor-pos" type="text" onChange={onFloorChange} value={floor}/>
                </div>
                <div className="form-item">
                    <label htmlFor="section-pos">Section</label>
                    <input id="section-pos" type="text" onChange={onSectionChange} value={section}/>
                </div>
                <button className="custom-button add-row-button" onClick={onAddZone}>Add zone</button>
            </div>
        </div>
    );
}

Instruments.propsTypes = {
    onAddZone: PropsTypes.func
}

export default Instruments;