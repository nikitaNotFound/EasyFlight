import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as UserService from "../services/UserSerivce";

import { connect } from 'react-redux';

function AuthorizedRoute({ component: Component, userInfo: userInfo, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                UserService.checkLogin(userInfo).authorized === true ? <Component props={{ ...rest }} /> : <Redirect to="/signin" />
            }
        />
    );
}

export default connect(state => state)(AuthorizedRoute);