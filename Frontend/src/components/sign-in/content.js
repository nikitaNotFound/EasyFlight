import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import MessageBox from '../common/message-box';

import * as UserService from '../../services/UserSerivce';

import googleIcon from '../../icons/google-icon.png';
import facebookIcon from '../../icons/facebook-icon.png';

import '../../styles/registration.css';
import { BadRequestError } from '../../services/RequestErrors';
import { invalidInput, defaultErrorMessage, badLoginData } from '../common/message-box-messages';

import store from '../../store/store';
import * as types from '../../store/ActionTypes';

function Content(props) {
    const [email, changeEmail] = useState(null);
    const [password, changePassword] = useState(null);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onLogin() {
        if (!email || !password) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        try {
            const userInfo = await UserService.login({email: email, password: password});
            store.dispatch({ type: types.CHANGE_USER_INFO, payload: userInfo });
            props.history.push('/');
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(badLoginData());
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    return (
        <main className="rounded">
            {showMessageBox()}
            <div className="form-block form-sign-up">
                <input
                    className="form-control"
                    placeholder="Email"
                    onChange={(event) => changeEmail(event.target.value)}
                />
                <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    onChange={(event) => changePassword(event.target.value)}
                />
                <button className="btn btn-primary button-dark main-button" onClick={onLogin}>
                    Sign in
                </button>

                <div className="input-group-btn">
                    <button className="btn btn-primary button-dark sec-button">
                        <img src={googleIcon} className="login-item-img" alt="google-icon"/>
                    </button>
                    <button className="btn btn-primary button-dark sec-button">
                        <img src={facebookIcon} className="login-item-img" alt="facebook-icon"/>
                    </button>
                </div>
                
                <div className="sign-up-option">
                    <Link to="/signup">
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Content);