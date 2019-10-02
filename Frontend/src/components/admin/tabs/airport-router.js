import { Switch, Route } from 'react-router-dom';
import Page from './airports';
import AddPage from './airports/add-page';
import EditPage from './airports/edit-page';
import React from 'react';

function AirportsRouter() {
    return (
        <Switch>
            <Route exact path="/admin/airports" component={Page}/>
            <Route path="/admin/airports/add" component={AddPage}/>
            <Route path="/admin/airports/edit/:id" component={EditPage}/>
        </Switch>
    );
}

export default AirportsRouter;