import React, {Component} from 'react';

class Switcher extends Component {
    render () {
        return (
            <div class="content-filter-switcher rounded-circle" onClick={this.props.switcher}>
                filter
            </div>
        );
    }
}

export default Switcher;