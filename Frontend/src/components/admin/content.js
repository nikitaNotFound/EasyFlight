import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AirplanesRouter from './tabs/airplanes-router';
import AirportsRouter from './tabs/airports-router';
import FlightsRouter from './tabs/flights-router';

function Content () {
    return (
        <main className="rounded none-mode">
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
                <Route path="/admin/airplanes" component={AirplanesRouter}/>
                <Route path="/admin/airports" component={AirportsRouter}/>
                <Route path="/admin/flights" component={FlightsRouter}/> 
            </Switch>
        </main>
    );
}

export default Content;