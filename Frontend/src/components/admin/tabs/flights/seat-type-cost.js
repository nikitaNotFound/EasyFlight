import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import ParamField from '../../../common/param-field';

function SeatTypeCost(props) {
    const [cost, changeCost] = useState(props.cost);

    function onCostChange(event){
        let newCost = Number(event.target.value);
        changeCost(newCost);
        props.onCostInfoChange(props.typeId, newCost);
    }

    return (
        <ParamField
            name={props.name + ' (cost)'}
            value={cost}
            onChange={onCostChange}
            inputType="text"
        />
    );
}

SeatTypeCost.propsTypes = {
    name: PropsTypes.string,
    typeId: PropsTypes.number,
    cost: PropsTypes.number,
    onCostInfoChange: PropsTypes.func
}

export default SeatTypeCost;