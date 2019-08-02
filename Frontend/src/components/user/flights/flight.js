import React, {Component} from 'react';
import buyIcon from '../../../icons/buy-icon.png';
import PropsTypes from 'prop-types';

class Flight extends Component {
    static propsTypes = {
        from: PropsTypes.string,
        to: PropsTypes.string,
        desc: PropsTypes.string,
        cost: PropsTypes.number
    }

    render () {
        return (
            <div className="row list-item rounded">
                <div className="col-sm-2" name="item-image">
                    <img src="icons/test-company-2.jpg" className="list-item-img" alt="company-icon"/>
                </div>
                <div className="col-sm-8" name="item-content">
                    <div className="container-fluid">
                        <h5>From: {this.props.from} To: {this.props.to}</h5>
                    </div>

                    <div className="container-fluid">
                        {this.props.desc}
                    </div>
                </div>
                <div className="col-sm-2" name="item-buy">
                    <div className="item-cost" name="item-cost">
                        {this.props.cost}
                    </div>
                    <button type="submit" className="btn btn-primary button-buy">
                        <img src={buyIcon} alt="icon-book"/>
                        Book
                    </button>
                </div>
            </div>
        );
    }
}

export default Flight;