import React, { useState } from 'react';
import PropsTypes from 'prop-types';

const valueTypes = {
    StringType: 0,
    NumberType: 1
}

function GetValueType(props) {
    if (props.value >= 0) {
        return valueTypes.NumberType;
    } else {
        return valueTypes.StringType;
    }
}

// you need to set start value as 0 in HOC if param field value used to be a number
export default function ParamField(props) {
    const [valueType, changeValueType] = useState(GetValueType(props));

    function onValueChange(event) {
        if (valueType === valueTypes.NumberType) {
            const newValueNumber = Number(event.target.value);
            if (newValueNumber && newValueNumber >= 0) {
                props.onChange(newValueNumber);
            } else if (!event.target.value) {
                props.onChange(0);
            }
        } else {
            if (event.target.value === ' ') {
                props.onChange('');
                return;
            }

            const newValueString = event.target.value;
            props.onChange(newValueString);
        }
    }

    return (
        <div className="form-item">
            <label htmlFor={`${props.name}`}>
                {props.name}
            </label>
            <input 
                id={`${props.name}`}
                onChange={onValueChange}
                value={props.value}
                type={props.inputType}
                autoComplete="off"
            />
        </div>
    );
}

ParamField.propsTypes = {
    name: PropsTypes.string,
    value: PropsTypes.number,
    onChange: PropsTypes.func,
    inputType: PropsTypes.string
}