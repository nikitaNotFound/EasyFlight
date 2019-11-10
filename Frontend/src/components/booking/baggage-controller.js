import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import LayoutHeadline from './layout-headline';

export default function BaggageController(props) {
    const [count, changeCount] = useState(0);
    const [carryonCount, changeCarryonCount] = useState(0);

    function onCountChange(event) {
        const newValue = Number(event.target.value);
        if (newValue >= 0) {
            changeCount(newValue);
            props.changeSuitcaseCount(newValue);
        }
    }

    function onCarryonChange(event) {
        const newValue = Number(event.target.value);
        if (newValue >= 0) {
            changeCarryonCount(newValue);
            props.changeHandLuggageCount(newValue);
        }
    }

    return (
        <div className="baggage-controller rounded">
            <LayoutHeadline content="Baggage" />
            <div className="baggage-info">
                {`Max suitcase mass: ${props.suitcaseMass} kg`} <br />
                {`Max suitcase count: ${props.suitcaseCount}`} <br />
                <input value={count} onChange={onCountChange} />
                suitcase count
            </div>

            <div className="baggage-info">
                {`Max hand luggage mass: ${props.carryonMass} kg`} <br />
                {`Max hand luggage count: ${props.carryonCount}`} <br />
                <input value={carryonCount} onChange={onCarryonChange} />
                hand luggage count
            </div>
        </div>
    );
}

BaggageController.propsTypes = {
    changeSuitcaseCount: PropsTypes.number,
    suitcaseMass: PropsTypes.number,
    suitcaseCount: PropsTypes.number,
    changeHandLuggageCount: PropsTypes.func,
    carryonMass: PropsTypes.number,
    carryonCount: PropsTypes.number
};