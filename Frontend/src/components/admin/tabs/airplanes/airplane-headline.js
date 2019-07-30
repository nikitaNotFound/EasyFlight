import React, {Component} from 'react';
import PropsTypes from 'prop-types';

class AirportHeadline extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        sitsCount: PropsTypes.number
    }

    render () {
        return (
            <div className="row">
                <div className="col-6">
                    <h5>{this.props.name}</h5>
                </div>
                <div className="col-6">
                    <h6>{this.props.sitsCount}</h6>
                </div>
            </div>
        );
    }
}

export default AirportHeadline;