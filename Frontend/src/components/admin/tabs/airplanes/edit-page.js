import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import AddIcon from '../../../../icons/add-image.png';
import SeatEditor from './seat-editor';
import Spinner from '../../../common/spinner';
import * as AirplaneService from '../../../../services/AirplaneService';

function Edit (props) {
    const [isLoading, changeLoadingMode] = useState(true);
    const [airplane, changeAirplane] = useState();

    useEffect(() => {
        const airplaneLoading = AirplaneService.getById(props.match.params.id);
        airplaneLoading
            .then(data => {
                onDataSuccessful(data);
            })
            .catch(error => {
                onDataFail(error);
            });
    }, []);

    function onDataSuccessful (airplane) {
        changeAirplane(airplane);
        changeLoadingMode(false);
    }

    function onDataFail (error) {
        alert(error);
    }


    if (!isLoading) { 
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
                                <input type="text" value={airplane.name} name="name"/>
                            </div>
                            <div className="form-item">
                                <input type="text" value={airplane.seats.length} readOnly/>
                            </div>
                            <div className="form-item">
                                <input value={airplane.maxMass}/>
                            </div>
                            <br/>
                            <SeatEditor/>
                        </div>
                    </div>
                    <input type="submit" value="Save" className="add-button"/>
                </form>
            </div>
        );
    }

    else {
        return (
            <Spinner/>
        );
    }
}

export default Edit;