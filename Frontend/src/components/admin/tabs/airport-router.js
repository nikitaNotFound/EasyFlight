import { Switch, Route } from 'react-router-dom';
import Page from './airports';
import Add from './airports/add-page';
import Edit from './airports/edit-page';
import React from 'react';

function AirportsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/airports" component={Page}/>
            <Route path="/admin/airports/add" component={Add}/>
            <Route path="/admin/airports/edit/:id" component={Edit}/>
        </Switch>
    );
}

export default AirportsRouter;