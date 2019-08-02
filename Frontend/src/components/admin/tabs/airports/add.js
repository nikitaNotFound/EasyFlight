import React, {Component} from 'react';
import PropsTypes from 'prop-types';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';

class Adding extends Component {
    propsTypes = {
        cancel: PropsTypes.func
    }

    render () {
        return (
            <div className="list-item-action adding">
                <Headline name="Adding new airport"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={BuyIcon} className="adding-form-img" alt="add"/>
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
                    <button value="Cancel" onClick={this.props.cancel}/>
                </form>
            </div>
        );
    }
}

export default Adding;