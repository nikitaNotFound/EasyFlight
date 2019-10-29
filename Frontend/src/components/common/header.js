import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="rounded-bottom non-selectable">
            <div className="row">
                <div className="col-sm-12 col-lg-8">
                    <Link to="/" className="non-dec-link">
                        <h1 className="display-4 company-icon">easy flight</h1>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;