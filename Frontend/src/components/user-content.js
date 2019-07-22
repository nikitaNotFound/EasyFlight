import React from "react";
import FlightsListFilter from "./flights/flights-filter";
import FlightsListBody from "./flights/flights-body";
import FlightsListSwitcher from "./flights/flights-switcher";

class UserContent extends React.Component {
    render () {
        return (
        <div class="row">
            <FlightsListSwitcher />

            <FlightsListBody />

            <FlightsListFilter />
        </div>
        );
    }
}

export default UserContent;