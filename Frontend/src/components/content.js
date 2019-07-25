import React from "react";
import Filter from "./flights/filter";
import List from "./flights/list";
import Switcher from "./flights/switcher";

class Content extends React.Component {
    render () {
        return (
            <div class="row">
                <Switcher />

                <List />

                <Filter />
            </div>
        );
    }
}

export default Content;