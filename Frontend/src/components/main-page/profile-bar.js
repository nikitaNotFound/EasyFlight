import React from 'react'
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

import '../../styles/profile-bar.css';

import User from '../../services/user-models/user';

function ProfileBar(props) {
    return (
        <div className="profile-bar-body">
            <div className="name rounded-left">
                {props.userInfo.firstName}
            </div>
            <Link to="/profile" className="non-dec-link">
                <div className="settings rounded-right">
                    Profile
                </div>
            </Link>
        </div>
    );
}

ProfileBar.propsTypes = {
    userInfo: PropsTypes.instanceOf(User)
}

export default ProfileBar;