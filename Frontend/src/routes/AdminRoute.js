import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as UserService from "../services/UserSerivce";

export default function AdminRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => (UserService.checkLogin().admin === true ? <Component /> : <Redirect to="/" />)}
        />
    );
}