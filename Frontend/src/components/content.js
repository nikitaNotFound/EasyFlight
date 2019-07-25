import React from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';

class Content extends React.Component {
    state = {
        mode: 1 //0 - list and filter are visible, 1 - only list is visible, 2 - only filter will visible
    }

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
            mode: this.state.mode == 1 ? 2 : 1
        });
    }
}

export default Content;