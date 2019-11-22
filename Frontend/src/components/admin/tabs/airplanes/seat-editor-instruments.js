import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import { isNumber } from 'util';
import ParamField from '../../../common/param-field';

function Instruments(props) {
    const [floor, changeFloor] = useState(0);
    const [section, changeSection] = useState(0);

    function onAddZone() {
        if (isNumber(floor) && isNumber(section) && floor > 0 && section > 0) {
            props.onAddZone(floor, section);
        }
    }

    return (
        <div className="seat-editor-instruments">
            <div className="row">
                <ParamField
                    name="Floor"
                    value={floor}
                    onChange={changeFloor}
                    inputType="text"
                />
                <ParamField
                    name="Section"
                    value={section}
                    onChange={changeSection}
                    inputType="text"
                />
                <button className="custom-button add-row-button" onClick={onAddZone}>Add zone</button>
            </div>
        </div>
    );
}

Instruments.propsTypes = {
    onAddZone: PropsTypes.func
}

export default Instruments;