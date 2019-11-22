import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import '../../../../styles/admin-filter.css';
import SearchOptions from '../../../../services/airplane-models/search-options';
import ConfirmActionButton from '../../../common/confirm-action-button';
import ParamField from '../../../common/param-field';

function Filter(props) {
    const [name, changeName] = useState();

    const [carryingMax, changeCarryingMax] = useState(0);
    const [carryingMin, changeCarryingMin] = useState(0);

    const [seatCountMax, changeSeatCountMax] = useState(0);
    const [seatCountMin, changeSeatCountMin] = useState(0);

    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    function onFilterApply() {
        if (!name
            && !carryingMax
            && !carryingMin
            && !seatCountMax
            && !seatCountMin
        ) {
            changeMessageBoxValue('Setup filter!');
            return;
        }

        const newFilterOptions =
            new SearchOptions(
                name,
                carryingMax,
                carryingMin,
                seatCountMax,
                seatCountMin
            );

        props.onFilterApply(newFilterOptions);
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
        <div className="filter-body rounded">
            {showMessageBox()}
            <ComponentHeadline content="Filter"/>
            <div className="filter-row">
                <div className="filter-arg">
                    <ParamField
                        name="Name"
                        value={name}
                        onChange={changeName}
                        type="text"
                    />
                </div>

                <div className="filter-arg">
                    <ParamField
                        name="Min carrying"
                        value={carryingMin}
                        onChange={changeCarryingMin}
                        type="text"
                    />
                </div>
                
                <div className="filter-arg">
                    <ParamField
                        name="Max carrying"
                        value={carryingMax}
                        onChange={changeCarryingMax}
                        type="text"
                    />
                </div>

                <div className="filter-arg">
                    <ParamField
                        name="Min seat count"
                        value={seatCountMin}
                        onChange={changeSeatCountMin}
                        type="text"
                    />
                </div>

                <div className="filter-arg">
                    <ParamField
                        name="Max seat count"
                        value={seatCountMax}
                        onChange={changeSeatCountMax}
                        type="text"
                    />
                </div>
                
                <ConfirmActionButton onClick={onFilterApply} buttonContent="Search"/>
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}

export default Filter;