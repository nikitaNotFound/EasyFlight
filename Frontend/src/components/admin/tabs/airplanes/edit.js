import React, {Component} from 'react';
import Headline from '../common/headline';
import PropsTypes from 'prop-types';
import AddIcon from '../../../../icons/add-image.png';
import SitsEditor from './sits-editor';

class Edit extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        xSize: PropsTypes.number,
        ySize: PropsTypes.number,
        maxMass: PropsTypes.number,
        img: PropsTypes.string
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
                                <img src={AddIcon} className="adding-form-img"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" value={this.props.name} name="name"/>
                            </div>
                            <div className="form-item">
                                <input type="text" value={this.props.xSize} name="xSize"/>
                                <input type="text" value={this.props.ySize} name="ySize"/>
                                <input type="text" placeholder="sits count" readOnly/>
                            </div>
                            <div className="form-item">
                                <input value={this.props.maxMass}/>
                            </div>
                            <br/>
                            <SitsEditor/>
                        </div>
                    </div>
                    <input type="submit" value="Add" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Edit;