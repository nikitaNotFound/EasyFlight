import React, {useState} from 'react';
import PropsTypes from 'prop-types';

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

function getChoosenMode(props) {
    if (props.seat.choosen && props.seat.choosen === true) {
        return true;
    }
    return false;
}

function Seat(props) {
    const [seatTypeIndex, changeSeatTypeIndex] = useState(getSeatTypeIndex(props));
    const [chooseMode, changeChooseMode] = useState(getChoosenMode(props));

    function onClickHandler() {
        if (!chooseMode) {
            changeChooseMode(true);

            props.onSeatChoosen(props.seat);
        } else {
            changeChooseMode(false);

            props.onSeatUnchoosen(props.seat);
        }
    }

    if (seatTypeIndex === UNDEFINED_SEAT_TYPE_INDEX) {
        return (
            <div className={`seat non-selectable`}/>
        );
    }
    
    return (
        <div className={`seat non-selectable seat-type-${chooseMode}`}
            style={{background:props.seatTypes[seatTypeIndex].color}}
            onClick={onClickHandler}
        />
    );
}

Seat.PropsTypes = {
    seat: PropsTypes.object,
    seatTypes: PropsTypes.array,
    placeInfo: PropsTypes.object,
    onSeatChoosen: PropsTypes.func,
    onSeatUnchoosen: PropsTypes.func
}

export default Seat;