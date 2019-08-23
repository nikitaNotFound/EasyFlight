import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import { isNumber } from 'util';

function Instruments (props) {
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

    function onAddRow() {
        if (isNumber(floor) && isNumber(section) && floor > 0 && section > 0) {
            props.onAddRow(floor, section);
        }
    }

    return (
        <div className="seat-editor-instruments">
            <div className="row">
                <div className="form-item">
                    <label>Floor</label>
                    <input type="text" onChange={onFloorChange} value={floor}/>
                </div>
                <div className="form-item">
                    <label>Section</label>
                    <input type="text" onChange={onSectionChange} value={section}/>
                </div>
                <div className="custom-button" onClick={onAddRow}>add row</div>
            </div>
        </div>
    );
}

Instruments.propsTypes = {
    onAddRow: PropsTypes.func
}

export default Instruments;