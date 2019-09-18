import React, {useState, useEffect} from 'react';
import PropsTypes from 'prop-types';

import ComponentHeadline from '../common/component-headline';
import Spinner from '../common/spinner';
import SeatTypes from './seat-types/seat-types';
import SeatScheme from './seat-scheme/seat-scheme';

import * as AirplaneService from '../../services/AirplaneService';
import * as FlightService from '../../services/FlightService'

import '../../styles/booking.css';


export default function Content(props) {
    const [loading, changeLoading] = useState(true);
    const [flight, changeFlight] = useState();
    const [airplane, changeAirplane] = useState();
    const [seatTypes, changeSeatTypes] = useState();
    const [seats, changeSeats] = useState();

    useEffect(async () => {
        const flight = await FlightService.getById(props.flightId);
        changeFlight(flight);
        console.log(flight);

        const airplane = await AirplaneService.getById(flight.airplaneId);
        changeAirplane(airplane);
        changeSeatTypes(airplane.seatTypes);
        changeSeats(airplane.seats);

        changeLoading(false);
    }, [props.flightId]);

    if (loading) {
        return (
            <main className="rounded">
                <Spinner headline="Loading..."/>
            </main>
        );
    }

    return (
        <main className="rounded">
            <ComponentHeadline content="Booking"/>
            <SeatScheme/>
            <SeatTypes seatTypes={seatTypes}/>
        </main>
    );
}

Content.propsTypes = {
    flightId: PropsTypes.number
}