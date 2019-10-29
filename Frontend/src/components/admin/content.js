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
            <div className="tabs non-selectable">
                <Link className="non-dec-link" to="/admin/airports">
                    <div className="tabs-item">
                        Airports
                    </div>
                </Link>

                <Link className="non-dec-link" to="/admin/flights">
                    <div className="tabs-item">
                        Flights
                    </div>
                </Link>

                <Link className="non-dec-link" to="/admin/airplanes">
                    <div className="tabs-item">
                        Airplanes
                    </div>
                </Link>

                <Link className="non-dec-link" to="/admin/countries">
                    <div className="tabs-item">
                    Countries
                    </div>
                </Link>

                <Link className="non-dec-link" to="/admin/cities">
                    <div className="tabs-item">
                        Cities
                    </div>
                </Link>
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