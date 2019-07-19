class UserContent extends React.Component {
    render() {
        return (
        <div id="user-content">
            <FlightsList></FlightsList>
            <FlightsListFilter></FlightsListFilter>
        </div>
        );
    }
}

class ContentFilterSwitcher extends React.Component {
    render () {
        return (
        <div class="content-filter-switcher rounded-circle" name="content-filter-switcher" id="content-filter-switcher">
            filter
        </div>
        );
    }
}

class FlightsList extends React.Component {
    render () {
        return (
        <div class="list rounded" name="flights-list" id="flights-list">
            <FlightsListHeader></FlightsListHeader>
            <FlightsListBody></FlightsListBody>
        </div>
        );
    }
}

class FlightsListItem extends React.Component {
    render () {
        return (
        <div class="row list-item rounded">
            <div class="col-sm-2" name="item-image">
                <img src="icons/test-company.jpg" class="list-item-img"></img>
            </div>
            <div class="col-sm-8" name="item-content">
                <div class="container-fluid">
                    <h5>From: testCounty1 To: testCounty2</h5>
                </div>

                <div class="container-fluid">
                    This is a test flight. You can get tickes to it by free.
                    It would be nice if you make a good comment to our company.
                </div>
            </div>
            <div class="col-sm-2" name="item-buy">
                <div class="item-cost" name="item-cost">
                        0$
                </div>
                <button type="submit" class="btn btn-primary button-buy">
                    <img src="icons/buy-icon.png"></img>
                    Book
                </button>
            </div>
        </div>
        );
    }
}

class FlightsListHeader extends React.Component {
    render () {
        return (
        <div class="container-fluid list-header" name="list-header" id="list-header">
            <h4>Flights list</h4>
        </div>
        );
    }
}

class FlightsListBody extends React.Component {
    render () {
        return (
        <div class="container-fluid list-body" name="list-body" id="list-body">

        </div>
        );
    }
}

class FlightsListFilter extends React.Component {
    render () {
        return (
        <div class="list-filter rounded" name="list-filter" id="list-filter">
            <FlightsListHeader></FlightsListHeader>
            <FlightsListBody></FlightsListBody>
        </div>
        );
    }
}

class FlightsListFilterHeader extends React.Component {
    render () {
        return (
        <div class="container-fluid" name="filter-header" id="filter-id">
            <h4>Filter</h4>
        </div>
        );
    }
}

class FlightsListFilterBody extends React.Component {
    render () {
        return (
        <div class="container-fluid" name="filter-body" id="filter-body">
            <div class="row filter-item">
                Flight Airport
                <input class="form-control filter-control" placeholder="Airport name"></input>
            </div>

            <div class="row filter-item">
                <div class="col filter-col">
                    From city
                    <input class="form-control filter-control" placeholder="City name"></input>
                </div>
                <div class="col filter-col">
                    To city
                    <input class="form-control filter-control" placeholder="City name"></input>
                </div>
            </div>

            <div class="row filter-item">
                <div class="col filter-col">
                    Departure
                    <input class="form-control filter-control" type="datetime-local" placeholder="Date"></input>
                </div>
                <div class="col filter-col">
                    Departure back
                    <input class="form-control filter-control" type="datetime-local" placeholder="Date"></input>
                </div>
            </div>

            <div class="row filter-item">
                Trevel time (minimum)
                <input class="form-control filter-control" placeholder="Days count"></input>
            </div>

            <div class="row filter-item">
                Amount of tickets
                <input class="form-control filter-control" placeholder="Count"></input>
            </div>

            <div class="row filter-item">
                <button class="btn btn-primary button-filter">Apply filter</button>
            </div>
        </div>
        );
    }
}