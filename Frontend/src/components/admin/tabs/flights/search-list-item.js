import React from 'react';
import Airplane from '../../../../services/airplane-models/airplane';
import PropsTypes from 'prop-types';

function SearchListItem (props) {
    function onClickHandler () {
        console.log(1);
        props.onValueChange(props.airplane);
    }

    return (
        <div className="search-item rounded" onClick={onClickHandler}>
            {props.airplane.name}
        </div>
    );
}

SearchListItem.propsTypes = {
    airplane: PropsTypes.instanceOf(Airplane)
}

export default SearchListItem;