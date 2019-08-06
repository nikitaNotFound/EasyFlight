import React, {Component} from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from './search-list';
import * as AirportService from '../../../../services/AirportService';
import * as AirplaneService from '../../../../services/AirplaneService';
import * as FlightService from '../../../../services/FlightService';

class Editing extends Component {
    airports = AirportService.getAll();
    airplanes = AirplaneService.getAll();
    flight = FlightService.getById(this.props.match.params.id);

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
                                <SearchList array={this.airports} placeholder="from" value={this.flight.from}/>
                                <SearchList array={this.airports} placeholder="to" value={this.flight.to}/>
                                <div className="form-item">
                                    <label>departure time</label><br/>
                                    <input type="time" value={this.props.departureTime}/>
                                </div>
                                <SearchList array={this.airplanes} placeholder="airplane" value={this.flight.airplane}/>
                            </div>
                            <br/>
                            <textarea placeholder="description" value={this.flight.desc}/>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Editing;