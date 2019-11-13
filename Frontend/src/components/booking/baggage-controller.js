import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import LayoutHeadline from './layout-headline';

export default function BaggageController(props) {
    const [suitcaseCount, changeSuitcaseCount] = useState(props.suitcaseCountValue);
    const [handLuggageCount, changeHandLugggageCount] = useState(props.handLuggageCountValue);

    function onSuitcaseCountChange(event) {
        const newValue = Number(event.target.value);
        if (newValue >= 0) {
            changeSuitcaseCount(newValue);
            props.changeSuitcaseCount(newValue);
        }
    }

    function onHandLuggageCountChange(event) {
        const newValue = Number(event.target.value);
        if (newValue >= 0) {
            changeHandLugggageCount(newValue);
            props.changeHandLuggageCount(newValue);
        }
    }

    return (
        <div className="baggage-controller rounded">
            <LayoutHeadline content="Baggage" />
            <div className="baggage-info">
                {`Max suitcase mass: ${props.suitcaseMass} kg`} <br />
                {`Max suitcase count: ${props.suitcaseCount}`} <br />
                <input value={suitcaseCount} onChange={onSuitcaseCountChange} />
                suitcase count
            </div>

            <div className="baggage-info">
                {`Max hand luggage mass: ${props.handLuggageMass} kg`} <br />
                {`Max hand luggage count: ${props.handLuggageCount}`} <br />
                <input value={handLuggageCount} onChange={onHandLuggageCountChange} />
                hand luggage count
            </div>
        </div>
    );
}

BaggageController.propsTypes = {
    changeSuitcaseCount: PropsTypes.number,
    suitcaseMass: PropsTypes.number,
    suitcaseCount: PropsTypes.number,
    suitcaseCountValue: PropsTypes.number,
    changeHandLuggageCount: PropsTypes.func,
    handLuggageMass: PropsTypes.number,
    handLuggageCount: PropsTypes.number,
    handLuggageCountValue: PropsTypes.number
};