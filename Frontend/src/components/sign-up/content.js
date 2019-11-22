import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import MessageBox from '../common/message-box';
import GoogleLogin from 'react-google-login';

import * as UserService from '../../services/UserSerivce';

import User from '../../services/user-models/user';

import '../../styles/registration.css';
import { BadRequestError } from '../../services/RequestErrors';
import { invalidInput, defaultErrorMessage, duplicate } from '../common/message-box-messages';

import { changeUserInfo } from '../../store/actions/UserInfoActions';

import * as config from '../../config.json';

function Content(props) {
    const [name, changeName] = useState();
    const [surname, changeSurname] = useState();
    const [email, changeEmail] = useState();
    const [password, changePassword] = useState();
    const [confirmPassword, changeConfirmPassword] = useState();
    const [messageBoxValue, changeMessageBoxValue] = useState();

    async function onRegister() {
        if (!name
            || !surname
            || !email
            || !password
            || !confirmPassword
        ) {
            changeMessageBoxValue(invalidInput());
        }
        
        if (password != confirmPassword) {
            changeMessageBoxValue("Passwords do not match!");
            return;
        }

        const newUser = new User(
            name,
            surname,
            email,
            password
        );

        try {
            const userInfo = await UserService.register(newUser);
            changeUserInfo(userInfo);
            props.history.push('/');
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate(email));
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    async function onGoogleSuccess(info) {
        try {
            const userInfo = await UserService.registerWithGoogle(info.tokenId);
            changeUserInfo(userInfo);
            props.history.push('/');
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(duplicate("Account"));
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
                    placeholder="Name"
                    onChange={(event) => changeName(event.target.value)}
                />
                <input
                    className="form-control"
                    placeholder="Surname"
                    onChange={(event) => changeSurname(event.target.value)}
                />
                <input 
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    onChange={(event) => changeEmail(event.target.value)}
                />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    onChange={(event) => changePassword(event.target.value)}
                />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm password"
                    onChange={(event) => changeConfirmPassword(event.target.value)}
                />
                <button onClick={onRegister} className="btn btn-primary button-dark main-button">Sign up</button>

                <div className="social-networks">
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        onSuccess={onGoogleSuccess}
                        onFailure={() => changeMessageBoxValue(defaultErrorMessage())}
                        buttonText="Sign up with Google"
                    />
                </div>

                <div className="sign-option">
                    <Link to="/signin">
                        Sign in
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Content);