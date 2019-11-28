import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import MessageBox from '../common/message-box';
import GoogleLogin from 'react-google-login';

import * as UserService from '../../services/UserSerivce';

import '../../styles/registration.css';
import { BadRequestError } from '../../services/RequestErrors';
import { defaultErrorMessage, badLoginData } from '../common/message-box-messages';

import { changeUserInfo } from '../../store/actions/UserInfoActions';

import * as config from '../../config.json';

function Content(props) {
    const [email, changeEmail] = useState(null);
    const [password, changePassword] = useState(null);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onLogin(event) {
        event.preventDefault();
        if (!email || !password) {
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

    async function onGoogleSuccess(info) {
        try {
            const userInfo = await UserService.loginWithGoogle(info.tokenId);
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
                <form onSubmit={onLogin}>
                    <input
                        className="form-control"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(event) => changeEmail(event.target.value)}
                        required
                    />
                    <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(event) => changePassword(event.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary button-dark main-button">
                        Sign in
                    </button>
                </form>

                <div className="social-networks">
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        onSuccess={onGoogleSuccess}
                        onFailure={() => changeMessageBoxValue(defaultErrorMessage())}
                    />
                </div>
                
                <div className="sign-option">
                    <Link to="/signup">
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Content);
