import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from './cities';
import AddPage from './cities/add-page';
import EditPage from './cities/edit-page';

export default function CityRouter() {
    return (
        <Switch>
            <Route exact path="/admin/cities" component={Page}/>
            <Route path="/admin/cities/add" component={AddPage}/>
            <Route path="/admin/cities/edit/:id" component={EditPage}/>
        </Switch>
    );
}