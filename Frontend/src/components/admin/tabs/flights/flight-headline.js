import PropsTypes from 'prop-types';
import React, {Component} from 'react';

class Headline extends Component {
    static propsTypes = {
        from: PropsTypes.string,
        to: PropsTypes.string,
        cost: PropsTypes.number
    }

    render () {
        return (
            <div className="row">
                <div className="col-6">
                    <h5>From: {this.props.from} To: {this.props.to}</h5>
                </div>
                <div className="col-6">
                    <h6>{this.props.cost}</h6>
                </div>
            </div>
        );
    }
}

export default Headline;