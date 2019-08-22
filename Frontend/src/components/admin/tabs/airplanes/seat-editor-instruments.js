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
                <input type="text" onChange={onFloorChange} placeholder="floor"/>
                <input type="text" onChange={onSectionChange} placeholder="section"/>
                <div className="custom-button" onClick={onAddRow}>add row</div>
        </div>
    );
}

Instruments.propsTypes = {
    onAddRow: PropsTypes.func
}

export default Instruments;