import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';

import AirplaneHeadline from './airplane-headline';
import EditButton from '../../../common/edit-button';
import Spinner from '../../../common/spinner';

import AirplaneObject from '../../../../services/airplane-models/airplane';

import * as AirplaneService from '../../../../services/AirplaneService';

export default function Airplane(props) {
    const [seatCount, changeSeatCount] = useState();
    const [loading, changeLoading] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const seats = await AirplaneService.getAirplaneSeats(props.airplane.id);

            changeSeatCount(seats.length);
        }
        fetchData();
    }, [props.airplane.id]);

    if (loading) {
        return (
            <div className="row rounded list-item">
                <Spinner headline="Loading..."/>
            </div>
        );
    }

    return (
        <div className="row rounded list-item">
            <div className="col-11">
                <AirplaneHeadline 
                    name={props.airplane.name}
                    seatCount={`${seatCount} seats`}
                />
                {`max mass = ${props.airplane.carryingKg}kg`}
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