import React from 'react';
import { Link } from 'react-router-dom';

export default function SignBar() {
    return (
        <div className="sing-up-in">
            <Link to="/signin">sign in</Link> or <Link to="/signup">sign up</Link>
        </div>
    );
}