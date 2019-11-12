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
            <div className="name rounded-left">
                {props.userInfo.firstName}
            </div>
            <Link to="/profile" className="non-dec-link">
                <button className="settings">
                    <img src={SettingsIcon}/>
                </button>
            </Link>
            <button className="logout non-selectable rounded-right" onClick={onLogout}>
                <img src={LogoutIcon}/>
            </button>
        </div>
    );
}

ProfileBar.propsTypes = {
    userInfo: PropsTypes.instanceOf(User)
}

export default ProfileBar;