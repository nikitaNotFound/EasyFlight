import { Switch, Route } from 'react-router-dom';
import Page from './airplanes';
import AddPage from './airplanes/add-page';
import EditPage from './airplanes/edit-page';
import React from 'react';

function AirplanesRouter() {
    return (
        <Switch>
            <Route exact path="/admin/airplanes" component={Page}/>
            <Route path="/admin/airplanes/add" component={AddPage}/>
            <Route path="/admin/airplanes/edit/:id" component={EditPage}/>
        </Switch>
    );
}

export default AirplanesRouter;