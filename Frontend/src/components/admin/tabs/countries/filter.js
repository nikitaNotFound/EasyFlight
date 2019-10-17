import React, {useState} from 'react';
import PropsTypes from 'prop-types';

import SearchOptions from '../../../../services/airport-models/search-options';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';


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

    function onNameChanged(event) {
        if (!event.target.value) {
            changeName(null);
        }

        changeName(event.target.value);
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
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={onNameChanged}
                    />
                </div>
            </div>
            <div className="filter-apply rounded" onClick={onFilterApply}>
                apply
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}