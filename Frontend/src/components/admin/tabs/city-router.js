import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './cities';
import Add from './cities/add';
import Edit from './cities/edit';

export default function CityRouter() {
    return (
        <Switch>
            <Route exact path="/admin/cities" component={Main}/>
            <Route path="/admin/cities/add" component={Add}/>
            <Route path="/admin/cities/edit/:id" component={Edit}/>
        </Switch>
    );
}