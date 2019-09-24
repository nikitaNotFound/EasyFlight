import React, { useState } from "react";
import PropsTypes from "prop-types";

import SeatObject from "../../../../services/airplane-models/seat";

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
                row: props.placeInfo.row,
                number: props.placeInfo.number
            };
            changeSeatTypeIndex(UNDEFINED_SEAT_TYPE_INDEX);
            props.onSeatDeleted(seatPosition);
        } else if (oldTypeIndex === UNDEFINED_SEAT_TYPE_INDEX) {
            const newSeat = new SeatObject(
                props.placeInfo.floor,
                props.placeInfo.section,
                props.placeInfo.zone,
                props.placeInfo.row,
                props.placeInfo.number,
                seatTypeIndex
            );

            props.onSeatAdded(newSeat);
            changeSeatTypeIndex(newTypeIndex);
        } else {
            props.onSeatChanged(newTypeIndex, props.placeInfo);
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