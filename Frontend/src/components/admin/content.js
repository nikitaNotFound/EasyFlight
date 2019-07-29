import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, BrowserRouter} from 'react-router-dom';
import Airports from './tabs/airports';
import Airplanes from './tabs/airplanes';
import Flights from './tabs/flights';

function Content () {
    return (
        <main className="rounded">
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

                <div className="content">
                    <Switch>
                        <Route path="/admin/airplanes" component={Airplanes}/>                     
                        <Route path="/admin/airports" component={Airports}/>
                        <Route path="/admin/flights" component={Flights}/> 
                    </Switch>
                </div>
            </BrowserRouter>
        </main>
    );
}

export default Content;