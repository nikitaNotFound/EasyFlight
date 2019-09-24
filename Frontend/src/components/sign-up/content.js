import React, {Component} from 'react';
import googleIcon from '../../icons/google-icon.png';
import facebookIcon from '../../icons/facebook-icon.png';
import '../../styles/registration.css';

class Content extends Component {
    render () {
        return (
            <main className="rounded">
                <div className="form-block form-sign-up">
                    <input className="form-control" placeholder="Name" />
                    <input className="form-control" placeholder="Surname" />
                    <input className="form-control" placeholder="Email" />
                    <input className="form-control" type="password" placeholder="Password" />
                    <input className="form-control" type="password" placeholder="Confirm password" />
                    <button className="btn btn-primary button-dark main-button">Sign up</button>
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
}

export default Content;