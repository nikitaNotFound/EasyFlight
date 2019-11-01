import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import SeatObject from '../../../../services/airplane-models/seat';

const UNDEFINED_SEAT_TYPE_INDEX = -1;

function getSeatTypeIndex(props) {
    if (!props.seat) {
        return UNDEFINED_SEAT_TYPE_INDEX;
    } else {
        let index = UNDEFINED_SEAT_TYPE_INDEX;
        for (let i = 0, len = props.seatTypes.length; i < len; i++) {
            const element = props.seatTypes[i];
            if (element.id === props.seat.typeId) {
                index = i;
                break;
            }
        }

        return index;
    }
}

function Seat(props) {
    const [seatTypeIndex, changeSeatTypeIndex] = useState(getSeatTypeIndex(props));

    function onClickHandler() {
        const oldTypeIndex = seatTypeIndex;

        const newTypeIndex = oldTypeIndex + 1;

        if (newTypeIndex > props.seatTypes.length - 1) {
            const seatPosition = {
                floor: props.placeInfo.floor,
                section: props.placeInfo.section,
                zone: props.placeInfo.zone,
                row: props.placeInfo.row,
                number: props.placeInfo.number
            };
            changeSeatTypeIndex(UNDEFINED_SEAT_TYPE_INDEX);
            props.onSeatDeleted(seatPosition);
        } else if (oldTypeIndex === UNDEFINED_SEAT_TYPE_INDEX) {
            // i can be sure that name is unique, so, while seat type doesnt
            // have his own id (seat type not added in database), i can use 
            // its name as typeId, later, in save, i will rest typeId as numbers
            // from database
            const seatTypeId = props.seatTypes[newTypeIndex].id
                ? props.seatTypes[newTypeIndex].id
                : props.seatTypes[newTypeIndex].name

            const newSeat = new SeatObject (
                null,
                null,
                props.placeInfo.floor,
                props.placeInfo.section,
                props.placeInfo.zone,
                props.placeInfo.row,
                props.placeInfo.number,
                seatTypeId
            );

            console.log(newSeat);
            
            props.onSeatAdded(newSeat);
            changeSeatTypeIndex(newTypeIndex);
        } else {
            // i can be sure that name is unique, so, while seat type doesnt
            // have his own id (seat type not added in database), i can use 
            // its name as typeId, later, in save, i will rest typeId as numbers
            // from database
            const seatTypeId = props.seatTypes[newTypeIndex].id
                ? props.seatTypes[newTypeIndex].id
                : props.seatTypes[newTypeIndex].name
                
            props.onSeatChanged(seatTypeId, props.placeInfo);
            changeSeatTypeIndex(newTypeIndex);
        }
    }
    
    if (seatTypeIndex === UNDEFINED_SEAT_TYPE_INDEX) {
        return <div className={`seat seat-type-0 non-selectable`} onClick={onClickHandler} />;
    }

    return (
        <div
            className={`seat non-selectable`}
            style={{ background: props.seatTypes[seatTypeIndex].color }}
            onClick={onClickHandler}
        />
    );
}

Seat.PropsTypes = {
    seat: PropsTypes.object,
    seatTypes: PropsTypes.array,
    placeInfo: PropsTypes.object,
    onSeatAdded: PropsTypes.func,
    onSeatChanged: PropsTypes.func,
    onSeatDeleted: PropsTypes.func
};

export default Seat;