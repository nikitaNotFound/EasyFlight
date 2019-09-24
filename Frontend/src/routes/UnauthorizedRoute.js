import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as UserService from "../services/UserSerivce";

export default function UnauthorizedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => (UserService.checkLogin().status === false ? <Component /> : <Redirect to="/profile" />)}
        />
    );
}
