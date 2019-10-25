import React from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

import AirplaneHeadline from './airplane-headline';

export default function Airplane(props) {
    return (
        <div className="row rounded list-item">
            <div className="col-2">
                <img src="" className="list-item-img" alt="airport"/>
            </div>

            <div className="col-9">
                <AirplaneHeadline 
                    name={props.name}
                    seatCount={`${props.seatCount} seats`}
                />
                {`max mass = ${props.carrying}kg`}
            </div>

            <div className="col-1">
                <Link to={`/admin/airplanes/edit/${props.airplaneId}`}>
                    <div className="edit-button rounded non-selectable">
                        Edit
                    </div>
                </Link>
            </div>
        </div>
    );
}

Airplane.propsTypes = {
    name: PropsTypes.string,
    seatCount: PropsTypes.number,
    carrying: PropsTypes.number,
    airplaneId: PropsTypes.number,
}