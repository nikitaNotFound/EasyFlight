import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, BrowserRouter} from 'react-router-dom';
import AirportsPage from './tabs/airports-page';
import AirplanesPage from './tabs/airplanes-page';
import FlightsPage from './tabs/flights-page';

function Content () {
    return (
        <main className="rounded none-mode">
            <BrowserRouter>
                <div className="tabs">
                    <div className="tabs-item">
                        <Link to="/admin/airports">Airports</Link>
                    </div>
                    <div className="tabs-item">
                        <Link to="/admin/flights">Flights</Link>
                    </div>
                    <div className="tabs-item">
                        <Link to="/admin/airplanes">Airplanes</Link>
                    </div>
                </div>

                <Switch>
                    <Route path="/admin/airplanes" component={AirplanesPage}/>                     
                    <Route path="/admin/airports" component={AirportsPage}/>
                    <Route path="/admin/flights" component={FlightsPage}/> 
                </Switch>
            </BrowserRouter>
        </main>
    );
}

export default Content;