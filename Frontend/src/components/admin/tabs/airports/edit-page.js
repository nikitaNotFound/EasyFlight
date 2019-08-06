import React, {Component} from 'react';
import Headline from '../common/headline';
import * as AirportService from '../../../../services/AirportService';

class Edit extends Component {
    airport = AirportService.getById(this.props.match.params.id);

    render () {
        return (
            <div className="list-item-action rounded editing">
                <Headline name="Editing airport"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={this.airport.img} className="adding-form-img" alt="edit"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" name="name" value={this.airport.name}/>
                            </div>
                            <div className="form-item">
                                <input type="text" name="city" value={this.airport.city}/>
                                <input type="text" name="country" value={this.airport.country}/>
                            </div>
                            <br/>
                            <textarea value={this.airport.desc}/>
                        </div>
                    </div>
                    <input type="submit" value="Save" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Edit;