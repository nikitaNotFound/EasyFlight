import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './airplanes';
import Add from './airplanes/add';
import Edit from './airplanes/edit';

function AirplanesRouter() {
    return (
        <Switch>
            <Route exact path="/admin/airplanes" component={Main}/>
            <Route path="/admin/airplanes/add" component={Add}/>
            <Route path="/admin/airplanes/edit/:id" component={Edit}/>
        </Switch>
    );
}

export default AirplanesRouter;