import React, {Component} from 'react';
import ComponentHeadline from '../component-headline';

class Filter extends Component {
    render () {
        return (
            <div className="list-filter rounded">
                <ComponentHeadline content="Filter" />

                <div className="container-fluid">
                    <div className="row filter-item">
                        Flight Airport
                        <input className="form-control filter-control" placeholder="Airport name" />
                    </div>

                    <div className="row filter-item">
                        <div className="col filter-col">
                            From city
                            <input className="form-control filter-control" placeholder="City name" />
                        </div>
                        <div className="col filter-col">
                            To city
                            <input className="form-control filter-control" placeholder="City name" />
                        </div>
                    </div>

                    <div className="row filter-item">
                        <div className="col filter-col">
                            Departure
                            <input className="form-control filter-control" type="date" placeholder="Date" />
                        </div>
                        <div className="col filter-col">
                            Departure back
                            <input className="form-control filter-control" type="date" placeholder="Date" />
                        </div>
                    </div>

                    <div className="row filter-item">
                        Trevel time (minimum)
                        <input className="form-control filter-control" placeholder="Days count" />
                    </div>

                    <div className="row filter-item">
                        Amount of tickets
                        <input className="form-control filter-control" placeholder="Count" />
                    </div>

                    <div className="row filter-item">
                        <button className="btn btn-primary button-filter">Apply filter</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;