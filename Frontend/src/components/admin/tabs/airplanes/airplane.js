import React from 'react';
import PropsTypes from 'prop-types';

import AirplaneHeadline from './airplane-headline';
import EditButton from '../../../common/edit-button';

import AirplaneObject from '../../../../services/airplane-models/airplane';

export default function Airplane(props) {
    return (
        <div className="row rounded list-item">
            <div className="col-2">
                <img src="" className="list-item-img" alt="airport"/>
            </div>

            <div className="col-9">
                <AirplaneHeadline 
                    name={props.airplane.name}
                    seatCount={`${props.airplane.seats.length} seats`}
                />
                {`max mass = ${props.airplane.carrying}kg`}
            </div>

            <div className="col-1">
                <EditButton categoty="airplanes" editingItemId={props.airplane.id}/>
            </div>
        </div>
    );
}

Airplane.propsTypes = {
    airplane: PropsTypes.instanceOf(AirplaneObject)
}