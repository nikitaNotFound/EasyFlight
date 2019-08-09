import { Switch, Route } from 'react-router-dom';
import Page from './airplanes';
import Add from './airplanes/add-page';
import Edit from './airplanes/edit-page';
import React from 'react';

function AirplanesRouter () {
    return (
        <Switch>
            <Route exact path="/admin/airplanes" component={Page}/>
            <Route path="/admin/airplanes/add" component={Add}/>
            <Route path="/admin/airplanes/edit/:id" component={Edit}/>
        </Switch>
    );
}

export default AirplanesRouter;