import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import AirplaneRouter from './tabs/airplane-router';
import AirportRouter from './tabs/airport-router';
import FlightRouter from './tabs/flight-router';
import CountryRouter from './tabs/country-router';
import CityRouter from './tabs/city-router';


export default function Content() {
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
                <div className="tabs-item">
                    <Link className="non-dec-link" to="/admin/countries">Countries</Link>
                </div>
                <div className="tabs-item">
                    <Link className="non-dec-link" to="/admin/cities">Cities</Link>
                </div>
            </div>

            <Switch>
                <Route path="/admin/airplanes" component={AirplaneRouter}/>
                <Route path="/admin/airports" component={AirportRouter}/>
                <Route path="/admin/flights" component={FlightRouter}/>
                <Route path="/admin/countries" component={CountryRouter}/>
                <Route path="/admin/cities" component={CityRouter}/>
            </Switch>
        </main>
    );
}