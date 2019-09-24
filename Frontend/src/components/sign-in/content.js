import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import googleIcon from '../../icons/google-icon.png';
import facebookIcon from '../../icons/facebook-icon.png';
import MessageBox from '../common/message-box';
import * as UserService from '../../services/UserSerivce';
import '../../styles/registration.css';

function Content(props) {
    const [email, changeEmail] = useState(null);
    const [password, changePassword] = useState(null);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    async function onLogin() {
        const loginTry = await UserService.login({email: email, password: password});

        if (loginTry) {
            props.history.push('/');
        } else {
            changeMessageBoxValue('Login failed!');
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
            </div>
        </main>
    );
}

export default withRouter(Content);