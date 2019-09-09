import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AirplaneRouter from './tabs/airplane-router';
import AirportRouter from './tabs/airport-router';
import FlightRouter from './tabs/flight-router';

function Content() {
    return (
        <main className="rounded">
            <div className="tabs">
                <div className="tabs-item">
                    <Link className="non-dec-link" to="/admin/airports">Airports</Link>
                </div>
                <div className="tabs-item">
                    <Link className="non-dec-link" to="/admin/flights">Flights</Link>
                </div>
                <div className="tabs-item">
                    <Link className="non-dec-link" to="/admin/airplanes">Airplanes</Link>
                </div>
            </div>

            <Switch>
                <Route path="/admin/airplanes" component={AirplaneRouter}/>
                <Route path="/admin/airports" component={AirportRouter}/>
                <Route path="/admin/flights" component={FlightRouter}/> 
            </Switch>
        </main>
    );
}

export default Content;