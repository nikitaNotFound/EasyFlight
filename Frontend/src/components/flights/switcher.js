import React, {Component} from 'react';
import PropsTypes from 'prop-types';

class Switcher extends Component {
    static propsTypes = {
        switcher: PropsTypes.func
    }

    render () {
        return (
            <div class="content-filter-switcher rounded-circle" onClick={this.props.switcher}>
                filter
            </div>
        );
    }
}

export default Switcher;