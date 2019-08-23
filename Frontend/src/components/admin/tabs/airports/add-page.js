import React from 'react';
import Headline from '../common/headline';
import BuyIcon from '../../../../icons/add-image.png';

function Adding () {
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
                        <div className="row">
                            <div className="form-item">
                                <label>Airport name</label>
                                <input type="text" placeholder="airport name" name="name"/>
                            </div>
                            <div className="form-item">
                                <label>Country</label>
                                <input type="text" placeholder="country" name="country"/>
                            </div>
                            <div className="form-item">
                                <label>City</label>
                                <input type="text" placeholder="city" name="city"/>
                            </div>
                            <br/>
                            <textarea placeholder="description"/>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Add" className="add-button"/>
            </form>
        </div>
    );
}

export default Adding;