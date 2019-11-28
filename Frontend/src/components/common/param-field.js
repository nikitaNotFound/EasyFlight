import React, { useState } from 'react';
import PropsTypes from 'prop-types';

const valueTypes = {
    StringType: 0,
    NumberType: 1
}

function GetValueType(value) {
    if (value >= 0) {
        return valueTypes.NumberType;
    } else {
        return valueTypes.StringType;
    }
}

// you need to set start value as 0 in HOC if param field value used to be a number
export default function ParamField({name, onChange, value, inputType, ...other}) {
    const [valueType, changeValueType] = useState(GetValueType(value));

    function onValueChange(event) {
        if (valueType === valueTypes.NumberType) {
            const newValueNumber = Number(event.target.value);
            if (newValueNumber && newValueNumber >= 0) {
                onChange(newValueNumber);
            } else if (!event.target.value) {
                onChange(0);
            }
        } else {
            if (event.target.value === ' ') {
                onChange('');
                return;
            }

            const newValueString = event.target.value;
            onChange(newValueString);
        }
    }

    return (
        <div className="form-item">
            <label htmlFor={`${name}`}>
                {name}
            </label>
            <input 
                id={`${name}`}
                onChange={onValueChange}
                value={value}
                type={inputType}
                autoComplete="off"
                {...other}
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