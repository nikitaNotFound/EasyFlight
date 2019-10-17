import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './countries';
import Add from './countries/add';
import Edit from './countries/edit';

export default function AirportsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/countries" component={Main}/>
            <Route path="/admin/countries/add" component={Add}/>
            <Route path="/admin/countries/edit/:id" component={Edit}/>
        </Switch>
    );
}