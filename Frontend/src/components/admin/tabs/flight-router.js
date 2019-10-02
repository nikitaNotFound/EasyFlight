import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from './flights';
import AddPage from './flights/add-page';
import EditPage from './flights/edit-page';

export default function FlightsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/flights" component={Page}/>
            <Route path="/admin/flights/add" component={AddPage}/>
            <Route path="/admin/flights/edit/:id" component={EditPage}/>
        </Switch>
    );
}