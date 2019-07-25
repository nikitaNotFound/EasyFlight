import React, {Component} from 'react';
import buyIcon from '../../icons/buy-icon.png';
import PropsTypes from 'prop-types';

class Flight extends Component {
    static propsTypes = {
        fromCountry: PropsTypes.string,
        toCountry: PropsTypes.string,
        desc: PropsTypes.string,
        cost: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.number])
    }

    render () {
        return (
            <div class="row list-item rounded">
                <div class="col-sm-2" name="item-image">
                    <img src="icons/test-company-2.jpg" class="list-item-img" />
                </div>
                <div class="col-sm-8" name="item-content">
                    <div class="container-fluid">
                        <h5>From: {this.props.fromCountry} To: {this.props.toCountry}</h5>
                    </div>

                    <div class="container-fluid">
                        {this.props.desc}
                    </div>
                </div>
                <div class="col-sm-2" name="item-buy">
                    <div class="item-cost" name="item-cost">
                        {this.props.cost}
                    </div>
                    <button type="submit" class="btn btn-primary button-buy">
                        <img src={buyIcon} />
                        Book
                    </button>
                </div>
            </div>
        );
    }
}

export default Flight;