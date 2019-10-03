import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './airports';
import Add from './airports/add';
import Edit from './airports/edit';

function AirportsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/airports" component={Main}/>
            <Route path="/admin/airports/add" component={Add}/>
            <Route path="/admin/airports/edit/:id" component={Edit}/>
        </Switch>
    );
}

export default AirportsRouter;