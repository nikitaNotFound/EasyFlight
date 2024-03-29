import React from 'react'
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

import '../../styles/profile-bar.css';

import * as UserService from '../../services/UserSerivce';

import User from '../../services/user-models/user';

import LogoutIcon from '../../icons/logout-icon.png';
import SettingsIcon from '../../icons/settings-icon.png';

function ProfileBar(props) {
    async function onLogout() {
        await UserService.logout();
        window.location.reload();
    }

    return (
        <div className="profile-bar-body">
            <div className="name rounded-left non-selectable">
                {`${props.userInfo.firstName} ${props.userInfo.secondName}`}
            </div>
            <Link to="/profile" className="non-dec-link">
                <button className="settings">
                    <img src={SettingsIcon} alt="settings"/>
                </button>
            </Link>
            <button className="logout non-selectable rounded-right" onClick={onLogout}>
                <img src={LogoutIcon} alt="logout"/>
            </button>
        </div>
    );
}

ProfileBar.propsTypes = {
    userInfo: PropsTypes.instanceOf(User)
}

export default ProfileBar;