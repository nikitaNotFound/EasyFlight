import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from './cities';
import Add from './cities/add-page';
import Edit from './cities/edit-page';


export default function CityRouter() {
    return (
        <Switch>
            <Route exact path="/admin/cities" component={Page}/>
            <Route path="/admin/cities/add" component={Add}/>
            <Route path="/admin/cities/edit/:id" component={Edit}/>
        </Switch>
    );
}