import React, {Component} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SeatEditor from './seat-editor';

class Adding extends Component {
    render () {
        return (
            <div className="list-item-action adding">
                <Headline name="Adding new airplane"/>

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
                                <label value="Airplane name"/>
                                <input type="text" placeholder="airplane name" name="name"/>
                            </div>
                            <div className="form-item">
                                <input placeholder="max mass"/>
                            </div>
                            <br/>
                            <SeatEditor/>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Adding;