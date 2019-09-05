import React, {useState} from 'react';
import PropsTypes from 'prop-types';

function SeatTypeCost(props) {
    const [cost, changeCost] = useState(props.cost);

    function onCostChange(event){
        let newCost = Number(event.target.value);
        changeCost(newCost);
        props.onCostInfoChange(props.typeId, newCost);
    }

    return (
        <div className="form-item">
            <label htmlFor={props.name}>{props.name}</label>
            <input id={props.name} onChange={onCostChange} value={cost} type="text"/>
        </div>
    );
}

SeatTypeCost.propsTypes = {
    name: PropsTypes.string,
    typeId: PropsTypes.number,
    cost: PropsTypes.number,
    onCostInfoChange: PropsTypes.func
}

export default SeatTypeCost;