import PropsTypes from 'prop-types';
import React, {Component} from 'react';

class Headline extends Component {
    static propsType = {
        name: PropsTypes.string
    }

    render () {
        return (
            <h1>{this.props.name}</h1>
        );
    }
}

export default Headline;