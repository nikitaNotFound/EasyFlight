import React, {useState} from 'react';
import PropsTypes from 'prop-types';
import ComponentHeadline from '../../../common/component-headline';
import MessageBox from '../../../common/message-box';
import '../../../../styles/admin-filter.css';
import SearchOptions from '../../../../services/airplane-models/search-options';

function Filter(props) {
    const [name, changeName] = useState(props.filterOptions.name);

    const [carryingMax, changeCarryingMax] = useState(props.filterOptions.carryingMax);
    const [carryingMin, changeCarryingMin] = useState(props.filterOptions.carryingMin);

    const [seatCountMax, changeSeatCountMax] = useState(props.filterOptions.seatCountMax);
    const [seatCountMin, changeSeatCountMin] = useState(props.filterOptions.seatCountMin);

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

    function onNameChanged(event) {
        if (event.target.value) {
            changeName(null);
        }

        changeName(event.target.value);
    }

    function showMessageBox() {
        if (messageBoxValue) {
            return <MessageBox
                        hideFunc={changeMessageBoxValue}
                        message={messageBoxValue}
                    />
        }
    }

    return (
        <div className="filter-body rounded">
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

                <div className="filter-arg">
                    <label htmlFor="">Min carrying</label>
                    <input
                        type="text"
                        value={carryingMin}
                        onChange={(event) => changeCarryingMin(event.target.value)}
                    />
                </div>
                
                <div className="filter-arg">
                    <label htmlFor="">Max carrying</label>
                    <input
                        type="text"
                        value={carryingMax}
                        onChange={(event) => changeCarryingMax(event.target.value)}
                    />
                </div>

                <div className="filter-arg">
                    <label htmlFor="">Min seat count</label>
                    <input
                        type="text"
                        value={seatCountMin}
                        onChange={(event) => changeSeatCountMin(event.target.value)}
                    />
                </div>

                <div className="filter-arg">
                    <label htmlFor="">Max seat count</label>
                    <input
                        type="text"
                        value={seatCountMax}
                        onChange={(event) => changeSeatCountMax(event.target.value)}
                    />
                </div>

                <div className="filter-apply rounded" onClick={onFilterApply}>
                    apply
                </div>
            </div>
        </div>
    );
}

Filter.propsTypes = {
    onFilterApply: PropsTypes.func,
    filterOptions: PropsTypes.instanceOf(SearchOptions)
}

export default Filter;