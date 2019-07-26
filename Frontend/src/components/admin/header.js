import React from 'react';
import googleIcon from '../../icons/google-icon.png';
import facebookIcon from '../../icons/facebook-icon.png';

function Header () {
    return (
        <header className="rounded-bottom">
            <div className="row">
                <div className="col-sm-12 col-lg-8">
                    <h1 className="display-4 company-icon">easy flight</h1>
                </div>

                <div className="col-sm-12 col-lg-4">
                    admin panel
                </div>
            </div>
        </header>
    );
}

export default Header;