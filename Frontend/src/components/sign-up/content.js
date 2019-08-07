import React, {Component} from 'react';
import googleIcon from '../../icons/google-icon.png';
import facebookIcon from '../../icons/facebook-icon.png';

class Content extends Component {
    render () {
        return (
            <main className="rounded">
                <form className="form-block form-sign-up">
                    <input className="form-control" name="email" id="email" placeholder="Name" />
                    <input className="form-control" name="email" id="email" placeholder="Surname" />
                    <input className="form-control" name="email" id="email" placeholder="Email" />
                    <input className="form-control" name="password" id="password" placeholder="Password" />
                    <input className="form-control" name="password" id="password" placeholder="Confirm password" />
                    <button type="submit" className="btn btn-primary button-dark main-button">Sign up</button>
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-primary button-dark sec-button">
                            <img src={googleIcon} className="login-item-img" alt="google-icon"/>
                        </button>
                        <button type="submit" className="btn btn-primary button-dark sec-button">
                            <img src={facebookIcon} className="login-item-img" alt="facebook-icon"/>
                        </button>
                    </div>
                </form>
            </main>
        );
    }
}

export default Content;