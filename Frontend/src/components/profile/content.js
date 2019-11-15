import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AddImage from '../../icons/add-image.png';
import '../../styles/profile.css';

import * as FlightService from '../../services/FlightService';
import * as UserService from '../../services/UserSerivce';

import Spinner from '../common/spinner';
import Flights from './flights';
import MessageBox from '../common/message-box';
import { defaultErrorMessage, tooMuchUpdates, saved } from '../common/message-box-messages';

import ComponentHeadline from '../common/component-headline';

import { connect } from 'react-redux';
import { BadRequestError } from '../../services/RequestErrors';

import { changeUserInfo } from '../../store/actions/UserInfoActions';

function Content(props) {
    const [isLoading, changeLoadingMode] = useState(true);
    const [accountFlights, changeAccountFlights] = useState([]);
    const [messageBoxValue, changeMessageBoxValue] = useState();

    const [firstName, changeFirstName] = useState(props.firstName);
    const [secondName, changeSecondName] = useState(props.secondName);

    const [avatar, changeAvatar] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFlights = await FlightService.getAccountFlights();

                const accountAvatar = await UserService.getAvatar();

                if (!accountAvatar.image) {
                    changeAvatar(AddImage);
                } else {
                    changeAvatar('data:image/png;base64,' + accountAvatar.image);
                }

                changeAccountFlights(userFlights);
                changeLoadingMode(false);
            } catch {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
        fetchData();
    }, []);

    async function onNameSave() {
        try {
            await UserService.updateName(firstName, secondName);
            changeUserInfo(
                {
                    firstName: firstName,
                    secondName: secondName,
                    email: props.email,
                    password: props.password,
                    role: props.role
                }
            )
            changeMessageBoxValue(saved());
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(tooMuchUpdates());
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    async function onAvatarUpdate(event) {
        try {
            let avatar = new FormData();
            avatar.append('file', event.target.files[0]);

            const imageResult = await UserService.updateAvatar(avatar);

            changeAvatar('data:image/png;base64,' + imageResult.image);

            changeMessageBoxValue(saved());
        } catch (ex) {
            if (ex instanceof BadRequestError) {
                changeMessageBoxValue(tooMuchUpdates());
            } else {
                changeMessageBoxValue(defaultErrorMessage());
            }
        }
    }

    function showMessageBoxValue() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    if (isLoading) {
        return (
            <main className="rounded">
                {showMessageBoxValue()}
                <Spinner headline="Loading..."/>
            </main>
        );
    }

    return (
        <main className="rounded">
            {showMessageBoxValue()}
            <div className="main-info">
                <div className="row">
                    <div className="col-2">
                        <div className="user-photo">
                            <label htmlFor="photo">
                                <img src={avatar} alt="add user avatar" />
                            </label>
                            <input type="file" onChange={onAvatarUpdate} id="photo" accept=".png,.jpg,.jpeg"/>
                        </div>
                    </div>
                    <div className="col-10">
                        <input
                            type="text"
                            className="name-input"
                            value={firstName}
                            onChange={(event) => changeFirstName(event.target.value)}
                        />
                        <input
                            type="text"
                            className="name-input"
                            value={secondName}
                            onChange={(event) => changeSecondName(event.target.value)}
                        />

                        <button className="update-name-btn" onClick={onNameSave}>
                            <div className="text">Save</div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flight-history">
                <ComponentHeadline content="Your flights"/>
                <Flights accountFlights={accountFlights} />
            </div>
        </main>
    );
}

export default withRouter(connect(state => state.userInfo)(Content));
