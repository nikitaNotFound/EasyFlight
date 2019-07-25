import React from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';

class Content extends React.Component {
    /*
    layoutMode = {
        ListAndFilter: 0,
        List: 1,
        Filter: 2
    };
    state = {
        mode: this.layoutMode.ListAndFilter
    }
    */
    render () {
        return (
            <div class="row">
                <Switcher/>  switcher={this.swapFilterList.bind(this)}/>
                <Flights/>
                <Filter/>
            </div>
        );
    }
    /*
    render () {
        return (
            <div class="row">
                <Switcher switcher={this.swapFilterList.bind(this)}/>
                <Flights/>
                <Filter/>
            </div>
        );
    }

    swapFilterList () {
        this.setState({
            mode: this.state.mode == this.layoutMode. ? 2 : 1
        });
    }
    */
}

export default Content;