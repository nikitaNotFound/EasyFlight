import React from 'react';

function Header () {
    return (
        <header className="rounded-bottom non-selectable">
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