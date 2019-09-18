import React, {useState} from 'react';
import PropsTypes from 'prop-types';

import LayoutHeadline from './layout-headline';


export default function BaggageController(props) {
    const [mass, changeMass] = useState(0);

    function onMassChange(event) {
        const newValue = Number(event.target.value)
        if (newValue) {
            changeMass(newValue);
            props.changeBaggageCount(newValue);
        }
    }

    return (
        <div className="baggage-controller rounded">
            <LayoutHeadline content="Baggage"/>
            <input value={mass} onChange={onMassChange}/>kg
        </div>
    );
}

BaggageController.propsTypes = {
    changeBaggageCount: PropsTypes.number
}