import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from './countries';
import Add from './countries/add-page';
import Edit from './countries/edit-page';


export default function AirportsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/countries" component={Page}/>
            <Route path="/admin/countries/add" component={Add}/>
            <Route path="/admin/countries/edit/:id" component={Edit}/>
        </Switch>
    );
}