import React from 'react';
import googleIcon from '../../icons/google-icon.png';
import facebookIcon from '../../icons/facebook-icon.png';
import { Link } from 'react-router-dom';

function Header () {
    return (
        <header className="rounded-bottom">
            <div className="row">
                <div className="col-sm-12 col-lg-8">
                    <Link to="/" style={{textDecoration:'none', color:'rgb(108, 117, 121)'}}>
                        <h1 className="display-4 company-icon">easy flight</h1>
                    </Link>
                </div>

                <div className="col-sm-12 col-lg-4">
                    <form className="form-inline pull-right login-bar">
                        <div className="input-group">
                            <input className="form-control login-item" name="email" id="email" placeholder="Email" />
                            <input className="form-control login-item" name="password" id="password" placeholder="Password" />
                            <div className="input-group-btn">
                                <button type="submit" className="btn btn-primary button-dark login-item login-container">Login</button>
                                <button type="submit" className="btn btn-primary button-dark login-container">
                                    <img src={googleIcon} className="login-item-img" alt="google-icon"/>
                                </button>
                                <button type="submit" className="btn btn-primary button-dark login-container">
                                    <img src={facebookIcon} className="login-item-img" alt="facebook-icon"/>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="sing-up">
                        or <Link to="/signup">sign up</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;