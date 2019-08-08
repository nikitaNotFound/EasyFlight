import { Switch, Route } from 'react-router-dom';
import Page from './flights/index';
import Add from './flights/add-page';
import Edit from './flights/edit-page';
import React from 'react';

function FlightsRouter () {
    return (
        <Switch>
            <Route exact path="/admin/flights" component={Page}/>
            <Route path="/admin/flights/add" component={Add}/>
            <Route path="/admin/flights/edit/:id" component={Edit}/>
        </Switch>
    );
}

export default FlightsRouter;