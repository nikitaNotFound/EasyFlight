import React from "react";

class FlightsListFilter extends React.Component {
    render () {
        return (
            <div class="list-filter rounded" name="list-filter" id="list-filter">
                <div class="container-fluid" name="filter-header" id="filter-id">
                    <h4>Filter</h4>
                </div>

                <div class="container-fluid" name="filter-body" id="filter-body">
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
                            <input class="form-control filter-control" type="datetime-local" placeholder="Date" />
                        </div>
                        <div class="col filter-col">
                            Departure back
                            <input class="form-control filter-control" type="datetime-local" placeholder="Date" />
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

export default FlightsListFilter;