import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './flights';
import Add from './flights/add-page';
import Edit from './flights/edit-page';

export default function FlightsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/flights" component={Main}/>
            <Route path="/admin/flights/add" component={Add}/>
            <Route path="/admin/flights/edit/:id" component={Edit}/>
        </Switch>
    );
}