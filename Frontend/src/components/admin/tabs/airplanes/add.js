import React, {Component} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SitsEditor from './sits-editor';

class Adding extends Component {
    constructor (props) {
        super(props)
        this.state = {
            sitsCount: 0
        }
        this.xSizeChangedHandler = this.xSizeChangedHandler.bind(this);
        this.ySizeChangedHandler = this.ySizeChangedHandler.bind(this);
    }
    xSize = 0;
    ySize = 0;

    xSizeChangedHandler (event) {
        this.xSize = event.target.value;
        this.sitsCountChange();
    }

    ySizeChangedHandler (event) {
        this.ySize = event.target.value;
        this.sitsCountChange();
    }

    sitsCountChange () {
        this.setState({
            sitsCount: this.xSize * this.ySize
        });
    }

    render () {
        return (
            <div className="list-item-action adding">
                <Headline name="Adding new airplane"/>

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
                                <label value="Airplane name"/>
                                <input type="text" placeholder="airplane name" name="name"/>
                            </div>
                            <div className="form-item">
                                <input type="text" placeholder="xSize" name="city"
                                    onChange={this.xSizeChangedHandler}
                                />
                                <input type="text" placeholder="ySize" name="country"
                                    onChange={this.ySizeChangedHandler}
                                />
                                <input type="text" value={this.state.sitsCount} readOnly/>
                            </div>
                            <div className="form-item">
                                <input placeholder="max mass"/>
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

export default Adding;