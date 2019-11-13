import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import MessageBox from '../common/message-box';
import GoogleLogin from 'react-google-login';

import * as UserService from '../../services/UserSerivce';

import '../../styles/registration.css';
import { BadRequestError } from '../../services/RequestErrors';
import { invalidInput, defaultErrorMessage, badLoginData } from '../common/message-box-messages';

import { changeUserInfo } from '../../store/actions/UserInfoActions';

import * as config from '../../config.json';

function Content(props) {
    const [email, changeEmail] = useState(null);
    const [password, changePassword] = useState(null);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function login(email, password) {
        if (!email || !password) {
            changeMessageBoxValue(invalidInput());
            return;
        }

        try {
            const userInfo = await UserService.login({email: email, password: password});
            changeUserInfo(userInfo);
            props.history.push('/');
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(badLoginData());
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    function onLogin() {
        login(email, password);
    }

    function onGoogleSuccess(info) {
        const profile = info.getBasicProfile();

        login(profile.getEmail(), profile.getId());
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
                    value={email}
                    onChange={(event) => changeEmail(event.target.value)}
                />
                <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(event) => changePassword(event.target.value)}
                />
                <button className="btn btn-primary button-dark main-button" onClick={onLogin}>
                    Sign in
                </button>

                <div className="social-networks">
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        onSuccess={onGoogleSuccess}
                        onFailure={() => changeMessageBoxValue(defaultErrorMessage())}
                    />
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
