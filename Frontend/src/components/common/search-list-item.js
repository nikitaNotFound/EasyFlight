import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';

import Spinner from '../common/spinner';

function SearchListItem(props) {
    const [loading, changeLoading] = useState(true);
    const [name, changeName] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const newName = await props.getItemName(props.item);
            changeName(newName);
            changeLoading(false);
        }
        fetchData();
    });

    function onClickHandler () {
        props.onValueChange(props.item);
    }

    if (loading) {
        return (
            <div className="search-item rounded" onMouseDown={onClickHandler}>
                <Spinner headline="loading"/>
            </div>
        );
    }

    return (
        <div className="search-item rounded" onMouseDown={onClickHandler}>
            {name}
        </div>
    );
}

SearchListItem.propsTypes = {
    item: PropsTypes.object,
    getItemName: PropsTypes.func,
    onValueChange: PropsTypes.func
}

export default SearchListItem;