import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as UserService from '../services/UserSerivce';

import { connect } from 'react-redux';

function AdminRoute({ component: Component, userInfo: userInfo, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => 
                (UserService.checkLogin(userInfo).admin === true ? <Component /> : <Redirect to="/" />)
            }
        />
    );
}

export default connect(state => state)(AdminRoute);