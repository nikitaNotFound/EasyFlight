import React from 'react';
import PropsTypes from 'prop-types';

// you need to set start value as 0 in HOC if param field value used to be a number
export default function ParamField(props) {
    function onValueChange(event) {
        if (props.value >= 0) {
            const newValueNumber = Number(event.target.value);

            if (newValueNumber && newValueNumber > 0) {
                props.onChange(newValueNumber);
            }
        } else {
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