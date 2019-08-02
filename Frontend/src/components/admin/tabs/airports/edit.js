import React, {Component} from 'react';
import Headline from '../common/headline';
import PropsTypes from 'prop-types';

class Edit extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        city: PropsTypes.string,
        country: PropsTypes.string,
        desc: PropsTypes.string,
        img: PropsTypes.string
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
                                <img src={this.props.img} className="adding-form-img" alt="edit"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" name="name" value={this.props.name}/>
                            </div>
                            <div className="form-item">
                                <input type="text" name="city" value={this.props.city}/>
                                <input type="text" name="country" value={this.props.country}/>
                            </div>
                            <br/>
                            <textarea value={this.props.desc}/>
                        </div>
                    </div>
                            <input type="submit" value="Save" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Edit;