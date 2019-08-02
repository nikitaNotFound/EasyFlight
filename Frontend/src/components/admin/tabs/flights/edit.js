import React, {Component} from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import PropsTypes from 'prop-types';
import SearchList from './search-list';
import * as AirportsService from '../../../../services/AirportsService';
import * as AirplanesService from '../../../../services/AirplanesService';

class Editing extends Component {
    airports = AirportsService.getAll();
    airplanes = AirplanesService.getAll();

    propsTypes = {
        object: PropsTypes.object,
        cancel: PropsTypes.func
    }

    render () {
        return (
            <div className="list-item-action editing">
                <Headline name="Editing flight"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={BuyIcon} className="adding-form-img" alt="add"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <SearchList array={this.airports} placeholder="from" value={this.props.object.from}/>
                                <SearchList array={this.airports} placeholder="to" value={this.props.object.to}/>
                                <div className="form-item">
                                    <label>departure time</label><br/>
                                    <input type="time" value={this.props.departureTime}/>
                                </div>
                                <SearchList array={this.airplanes} placeholder="airplane" value={this.props.object.airplane}/>
                            </div>
                            <br/>
                            <textarea placeholder="description" value={this.props.object.desc}/>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </form>
                <button onClick={this.props.cancel} className="cancel-button">Cancel</button>
            </div>
        );
    }
}

export default Editing;