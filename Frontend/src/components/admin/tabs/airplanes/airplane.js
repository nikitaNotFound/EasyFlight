import React, {Component} from 'react';
import AirplaneHeadline from './airplane-headline';
import PropsTypes from 'prop-types';

class Airplane extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        sitsCount: PropsTypes.number,
        maxMass: PropsTypes.number
    }

    render () {
        return (
            <div className="row rounded list-item">
                <div className="col-2">
                    <img src="" className="list-item-img" alt="airport"/>
                </div>

                <div className="col-9">
                    <AirplaneHeadline 
                        name={this.props.name}
                        sitsCount={`${this.props.sitsCount} sits`}
                    />
                    {`max mass = ${this.props.maxMass}kg`}
                </div>

                <div className="col-1">
                    <button>Edit</button>
                </div>
            </div>
        );
    }
}

export default Airplane;