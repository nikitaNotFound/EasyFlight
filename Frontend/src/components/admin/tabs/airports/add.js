import React, {Component} from 'react';
import Headline from './headline';
import BuyIcon from '../../../../icons/add-image.png';

class Adding extends Component {
    render () {
        return (
            <div className="airports-item-action rounded adding">
                <Headline name="Adding new airport"/>

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
                            <input type="submit" value="Add" className="add-button"/>
                </form>
            </div>
        );
    }
}

export default Adding;