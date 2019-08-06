import React, {Component} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SeatEditor from './seat-editor';
import * as AirplaneService from '../../../../services/AirplaneService';

class Edit extends Component {
    airplane = AirplaneService.getById(this.props.match.params.id);

    render () {
        return (
            <div className="list-item-action editing">
                <Headline name="Editing airplane"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={AddIcon} className="adding-form-img" alt="add"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" value={this.airplane.name} name="name"/>
                            </div>
                            <div className="form-item">
                                <input type="text" value={this.airplane.seats.length} readOnly/>
                            </div>
                            <div className="form-item">
                                <input value={this.airplane.maxMass}/>
                            </div>
                            <br/>
                            <SeatEditor/>
                        </div>
                    </div>
                    <input type="submit" value="Save" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Edit;