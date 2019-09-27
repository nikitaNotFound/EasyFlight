import React, { useState } from "react";
import PropsTypes from "prop-types";

import LayoutHeadline from "./layout-headline";

export default function BaggageController(props) {
    const [count, changeCount] = useState(0);
    const [carryonCount, changeCarryonCount] = useState(0);

    function onCountChange(event) {
        const newValue = Number(event.target.value);
        if (newValue && newValue <= props.suitcaseCount) {
            changeCount(newValue);
            props.changeBaggageCount(newValue);
        }
    }

    function onCarryonChange(event) {
        const newValue = Number(event.target.value);
        if (newValue && newValue <= props.carryonCount) {
            changeCarryonCount(newValue);
            props.changeCarryonCount(newValue);
        }
    }

    return (
        <div className="baggage-controller rounded">
            <LayoutHeadline content="Baggage" />
            <div className="baggage-info">
                {`max suitcase mass: ${props.suitcaseMass} kg`} <br />
                {`max suitcase count: ${props.suitcaseCount}`} <br />
                <input value={count} onChange={onCountChange} />
                suitcase count
            </div>

            <div className="baggage-info">
                {`max carryon mass: ${props.carryonMass} kg`} <br />
                {`max carryon count: ${props.carryonCount}`} <br />
                <input value={carryonCount} onChange={onCarryonChange} />
                carryon count
            </div>
        </div>
    );
}

BaggageController.propsTypes = {
    changeBaggageCount: PropsTypes.number,
    suitcaseMass: PropsTypes.number,
    suitcaseCount: PropsTypes.number,
    changeCarryonCount: PropsTypes.func,
    carryonMass: PropsTypes.number,
    carryonCount: PropsTypes.number
};