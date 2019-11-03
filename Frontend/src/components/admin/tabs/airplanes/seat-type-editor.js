import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import { CirclePicker } from 'react-color'
import SeatTypeItem from './seat-type';
import MessageBox from '../../../common/message-box';

import { seatTypeDuplicate, seatTypeInvalidInput } from '../../../common/message-box-messages';

import SeatType from '../../../../services/airplane-models/seat-type';

import '../../../../styles/seat-types-editor.css';
import AddSeatType from '../../../../icons/add-icon.png';

export default function SeatTypesEditor(props) {
    const [color, changeColor] = useState();
    const [name, changeName] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    function onTypeAdd() {
        if (color && name) {
            let newType = new SeatType(null, name, color);

            if (!props.seatTypes || checkTypeAvailable(newType)) {
                props.onAddType(newType);
            } else {
                changeMessageBoxValue(seatTypeDuplicate());
            }
        } else {
            changeMessageBoxValue(seatTypeInvalidInput());
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

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    return (
        <div className="seat-types-editor">
            {showMessageBox()}
            <div className="row">
                <div className="col-md-3">
                    <CirclePicker onChange={({hex}) => changeColor(hex)}/>
                </div>

                <div className="col-md-2">
                    <label htmlFor="seat-type-name" className="seat-type-name-label">Type name</label><br/>
                    <input
                        className="seat-type-name-input"
                        type="text" value={name}
                        onChange={(event) => changeName(event.target.value)}
                        id="seat-type-name"
                    />
                    <button className="add-type-button" onClick={onTypeAdd}>
                        <img src={AddSeatType}/>
                    </button>
                    <div className="color-demo non-selectable" style={{background:color}}>Color</div>
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