import React, {Component} from 'react';
import Headline from '../common/headline';
import PropsTypes from 'prop-types';
import AddIcon from '../../../../icons/add-image.png';
import SitsEditor from './sits-editor';

class Edit extends Component {
    static propsTypes = {
        object: PropsTypes.object,
        cancel: PropsTypes.func
    }

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
                                <input type="text" value={this.props.object.name} name="name"/>
                            </div>
                            <div className="form-item">
                                <input type="text" value={this.props.object.sits.length} readOnly/>
                            </div>
                            <div className="form-item">
                                <input value={this.props.object.maxMass}/>
                            </div>
                            <br/>
                            <SitsEditor/>
                        </div>
                    </div>
                    <input type="submit" value="Save" className="add-button"/>
                </form>
                <button onClick={this.props.cancel} className="cancel-button">Cancel</button>
            </div>
        );
    }
}

export default Edit;