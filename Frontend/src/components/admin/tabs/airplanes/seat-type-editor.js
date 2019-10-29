import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import ColorWheel from 'color-wheel';
import SeatTypeItem from './seat-type';

import SeatType from '../../../../services/airplane-models/seat-type';

import '../../../../styles/seat-types-editor.css';

export default function SeatTypesEditor(props) {
    const [color, changeColor] = useState();
    const [name, changeName] = useState();

    function onColorChange(color) {
        const [h, s, l] = color;
        const newColor = `hsla(${Math.round(h * 360)},${Math.round(s * 100)}%,${Math.round(l * 100)}%,1)`;
        changeColor(newColor);
    }

    function onTypeAdd() {
        if (color && name) {
            let newType = new SeatType(null, name, color);

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

    function showSeatTypesList() {
        if (props.seatTypes) {
            return (
                <div>
                    {props.seatTypes.map(
                        (item, index) =>
                            <SeatTypeItem
                                name={item.name}
                                color={item.color}
                                id={item.id}
                                onTypeDelete={props.onTypeDelete}
                                arrayIndex={index}
                                key={index}
                            />
                    )}
                </div>
            );
        }
    }

    return (
        <div className="seat-types-editor">
            <div className="row">
                <div className="col-md-3">
                    <ColorWheel onChange={onColorChange}/>
                </div>

                <div className="col-md-2">
                    <label>Type name</label><br/>
                    <input
                        className="seat-type-name-input"
                        type="text" value={name}
                        onChange={(event) => changeName(event.target.value)}
                    />
                    <div className="color-demo" style={{background:color}}></div>
                    <button className="add-type-button non-selectable" onClick={onTypeAdd}>Add type</button>
                </div>

                <div className="col-md-7">
                    <div className="seat-types-headline">Current seat types</div>
                    {showSeatTypesList()}
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