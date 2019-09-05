import React from 'react';
import PropsTypes from 'prop-types';

function SearchListItem (props) {
    function onClickHandler () {
        props.onValueChange(props.item);
    }

    return (
        <div className="search-item rounded" onMouseDown={onClickHandler}>
            {props.getItemName(props.item)}
        </div>
    );
}

SearchListItem.propsTypes = {
    item: PropsTypes.object,
    getItemName: PropsTypes.func,
    onValueChange: PropsTypes.func
}

export default SearchListItem;