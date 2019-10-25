import React from 'react';
import { Link } from 'react-router-dom';
import SignBar from './sign-bar';
import ProfileBar from './profile-bar';
import '../../styles/login.css';

import { connect } from 'react-redux';

function Header(state) {
    function showBar() {
        if (state.userInfo) {
            return <ProfileBar userInfo={state.userInfo} />;
        }
        return <SignBar />;
    }

    return (
        <header className="rounded-bottom">
            <div className="row">
                <div className="col-sm-12 col-lg-9">
                    <Link to="/" className="non-dec-link">
                        <h1 className="display-4 company-icon">easy flight</h1>
                    </Link>
                </div>

                <div className="col-sm-12 col-lg-3">{showBar()}</div>
            </div>
        </header>
    );
}

export default connect(state => state)(Header);
