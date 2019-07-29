import React, {Component} from 'react';
import Headline from './headline';
import PropsTypes from 'prop-types';
import BuyIcon from '../../../../icons/add-image.png';

class Edit extends Component {
    static propsTypes = {
        name: PropsTypes.string,
        city: PropsTypes.string,
        country: PropsTypes.string,
        desc: PropsTypes.string
    }

    render () {
        return (
            <div className="airports-item-action rounded editing">
                <Headline name="Editing airport"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={BuyIcon} className="adding-form-img"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" placeholder="airport name" name="name"/>
                            </div>
                            <div className="form-item">
                                <input type="text" placeholder="city" name="city"/>
                                <input type="text" placeholder="country" name="country"/>
                            </div>
                            <br/>
                            <textarea placeholder="description"/>
                        </div>
                    </div>
                            <input type="submit" value="Save" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Edit;