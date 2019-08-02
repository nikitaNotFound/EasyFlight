import React, {Component} from 'react';
import Headline from '../common/headline';
import PropsTypes from 'prop-types';

class Edit extends Component {
    static propsTypes = {
        object: PropsTypes.object,
        cancel: PropsTypes.func
    }

    render () {
        return (
            <div className="list-item-action rounded editing">
                <Headline name="Editing airport"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={this.props.object.img} className="adding-form-img" alt="edit"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" name="name" value={this.props.object.name}/>
                            </div>
                            <div className="form-item">
                                <input type="text" name="city" value={this.props.object.city}/>
                                <input type="text" name="country" value={this.props.object.country}/>
                            </div>
                            <br/>
                            <textarea value={this.props.object.desc}/>
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