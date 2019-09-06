import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import ColorWheel from 'color-wheel';
import SeatTypeItem from './seat-type';
import SeatType from '../../../../services/airplane-models/seat-type';
import '../../../../styles/seat-types-editor.css';

function SeatTypesEditor(props) {
    const [color, changeColor] = useState();
    const [name, changeName] = useState();

    function onColorChange(color) {
        const [h, s, l] = color;
        const newColor = `hsla(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,1)`;
        changeColor(newColor);
    }

    function onNameChange(event) {
        changeName(event.target.value);
    }

    function onTypeAdd() {
        if (color && name) {
            let newType = new SeatType(props.seatTypes.length + 1, name, color);

            if (!props.seatTypes || checkTypeAvailable(newType)) {
                props.onAddType(newType);
            }
        }
    }

    function checkTypeAvailable(type) {
        for (let i = 0, len = props.seatTypes.length; i < len; i++) {
            const element = props.seatTypes[i];

            if (type.color === element.color || type.name === element.name) {
                return false;
            }
        }

        return true;
    }

    if (!props.seatTypes) {
        return (
            <div className="seat-types-editor">
                <div className="row">
                    <div className="col-md-3">
                        <ColorWheel onChange={onColorChange}/>
                    </div>

                    <div className="col-md-2">
                        <label>Type name</label><br/>
                        <input className="seat-type-name-input" type="text" value={name} onChange={onNameChange}/>
                        <div className="color-demo" style={{background:color}}></div>
                        <div className="add-type-button" onClick={onTypeAdd}>Add type</div>
                    </div>

                    <div className="col-md-7">
                        <div className="seat-types-headline">Current seat types</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="seat-types-editor">
            <div className="row">
                <div className="col-md-3">
                    <ColorWheel onChange={onColorChange}/>
                </div>

                <div className="col-md-2">
                    <label>Type name</label><br/>
                    <input className="seat-type-name-input" type="text" value={name} onChange={onNameChange}/>
                    <div className="color-demo" style={{background:color}}></div>
                    <div className="add-type-button" onClick={onTypeAdd}>Add type</div>
                </div>

                <div className="col-md-7">
                    <div className="seat-types-headline">Current seat types</div>
                    {props.seatTypes.map(
                        (item, index) => 
                            <SeatTypeItem
                                name={item.name}
                                color={item.color}
                                id={index}
                                onTypeDelete={props.onTypeDelete}
                                key={index}/>
                    )}
                </div>
            </div>
        </div>
    );
}

SeatTypesEditor.propsTypes = {
    seatTypes: PropsTypes.array,
    onAddType: PropsTypes.func,
    onTypeDelete: PropsTypes.func
}

export default SeatTypesEditor;