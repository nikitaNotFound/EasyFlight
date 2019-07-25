import React, {Component} from "react";
import ComponentHeadline from './component-headline';

class Filter extends Component {
    render () {
        return (
            <div class="list-filter rounded">
                <ComponentHeadline content="Filter" />

                <div class="container-fluid">
                    <div class="row filter-item">
                        Flight Airport
                        <input class="form-control filter-control" placeholder="Airport name" />
                    </div>

                    <div class="row filter-item">
                        <div class="col filter-col">
                            From city
                            <input class="form-control filter-control" placeholder="City name" />
                        </div>
                        <div class="col filter-col">
                            To city
                            <input class="form-control filter-control" placeholder="City name" />
                        </div>
                    </div>

                    <div class="row filter-item">
                        <div class="col filter-col">
                            Departure
                            <input class="form-control filter-control" type="date" placeholder="Date" />
                        </div>
                        <div class="col filter-col">
                            Departure back
                            <input class="form-control filter-control" type="date" placeholder="Date" />
                        </div>
                    </div>

                    <div class="row filter-item">
                        Trevel time (minimum)
                        <input class="form-control filter-control" placeholder="Days count" />
                    </div>

                    <div class="row filter-item">
                        Amount of tickets
                        <input class="form-control filter-control" placeholder="Count" />
                    </div>

                    <div class="row filter-item">
                        <button class="btn btn-primary button-filter">Apply filter</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;