import React, {useState} from 'react';
import PropsTypes from 'prop-types';

import SearchOptions from '../../../../services/airport-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import ConfirmActionButton from '../../../common/confirm-action-button';
import ParamField from '../../../common/param-field';

export default function Filter(props) {
    const [name, changeName] = useState(props.filterOptions.name);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!name) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        props.onFilterApply(name);
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    hideFunc={changeMessageBoxValue}
                    message={messageBoxValue}
                />
            );
        }
    }

    return (
        <div className="filter-body">
            {showMessageBox()}
            <ComponentHeadline content="Filter"/>
            <div className="filter-row">
                <div className="filter-arg">
                    <ParamField
                        name="Name"
                        value={name}
                        onChange={changeName}
                        inputType="text"
                    />
                </div>
            </div>
            <ConfirmActionButton onClick={onFilterApply} buttonContent="Search"/>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}