import React from 'react'
import PropsTypes from 'prop-types';
import UserInfo from '../../services/user-models/user-info';
import '../../styles/profile-bar.css';
import { Link } from 'react-router-dom';

function ProfileBar(props) {
    return (
        <div className="profile-bar-body">
            <div className="name rounded-left">
                {props.userInfo.name}
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
    userInfo: PropsTypes.instanceOf(UserInfo)
}

export default ProfileBar;