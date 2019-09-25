import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as UserService from "../services/UserSerivce";

export default function AuthorizedRoute({ component: Component, ...rest }) {
    console.log({ ...rest });
    return (
        <Route
            {...rest}
            render={() =>
                UserService.checkLogin().status === true ? <Component props={{ ...rest }} /> : <Redirect to="/signin" />
            }
        />
    );
}