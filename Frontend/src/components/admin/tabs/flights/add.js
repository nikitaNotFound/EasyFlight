import PropsTypes from 'prop-types';
import React, {Component} from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';
import SearchList from './search-list';
import * as AirportsService from '../../../../services/AirportsService';
import * as AirplanesService from '../../../../services/AirplanesService';

class Adding extends Component {
    airports = AirportsService.getAll();
    airplanes = AirplanesService.getAll();

    propsTypes = {
        cancel: PropsTypes.func
    }

    render () {
        return (
            <div className="list-item-action adding">
                <Headline name="Adding new flight"/>

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
                                <SearchList array={this.airports} placeholder="from"/>
                                <SearchList array={this.airports} placeholder="to"/>
                                <div className="form-item">
                                    <label>departure time</label><br/>
                                    <input type="time"/>
                                </div>
                                <SearchList array={this.airplanes} placeholder="airplane"/>
                            </div>
                            <br/>
                            <textarea placeholder="description"/>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </form>
                <button onClick={this.props.cancel} className="cancel-button">Cancel</button>
            </div>
        );
    }
}

export default Adding;