import React from "react";
import Filter from "./flights/filter";
import Body from "./flights/body";
import Switcher from "./flights/switcher";

class UserContent extends React.Component {
    render () {
        return (
            <div class="row">
                <Switcher />

                <Body />

                <Filter />
            </div>
        );
    }
}

export default UserContent;