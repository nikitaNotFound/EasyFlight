import React, {useState, useEffect} from 'react';
import Headline from '../common/headline';
import Spinner from '../../../common/spinner';
import * as AirportService from '../../../../services/AirportService';

function Edit (props) {
    const [isLoading, changeLoadingMode] = useState(true);
    const [airport, changeAirport] = useState();

    useEffect(() => {
        const airportLoading = AirportService.getById(props.match.params.id);
        airportLoading
            .then(data => {
                onDataSuccessful(data);
            })
            .catch(error => {
                onDataFail(error);
            });
    });

    function onDataSuccessful (data) {
        changeAirport(data);
        changeLoadingMode(false);
    }

    function onDataFail (error) {
        alert(error);
    }

    if (!isLoading) {
        return (
            <div className="list-item-action rounded editing">
                <Headline name="Editing airport"/>

                <form method="post" className="adding-form">
                    <div className="row">
                        <div className="col-2">
                            <input type="file" name="image" id="file-input" className="file-upload"/>
                            <label htmlFor="file-input">
                                <img src={airport.img} className="adding-form-img" alt="edit"/>
                            </label>
                        </div>
                        <div className="col-10">
                            <div className="form-item">
                                <input type="text" name="name" value={airport.name}/>
                            </div>
                            <div className="form-item">
                                <input type="text" name="city" value={airport.city}/>
                                <input type="text" name="country" value={airport.country}/>
                            </div>
                            <br/>
                            <textarea value={airport.desc}/>
                        </div>
                    </div>
                    <input type="submit" value="Save" className="add-button"/>
                </form>
            </div>
        );
    }
    return (
        <Spinner/>
    );
}

export default Edit;