import PropsTypes from 'prop-types';
import React, {useState} from 'react';
import Item from './search-list-item';

function SearchList (props) {
    const [mode, changeMode] = useState(false);

    function openList () {
        setTimeout(changeMode, 0, true);
    }

    function closeList () {
        setTimeout(changeMode, 0, false);
    }

    return (
        <div className="form-item">
            <label htmlFor={props.placeholder}>{props.placeholder}</label>
            <input id={props.placeholder} type="text" value={props.value} autoComplete="off"
                name={props.placeholder}
                placeholder={props.placeholder}
                onFocus={openList} 
                onBlur={closeList}/>

            <div className={`search-list non-selectable 
                ${mode == true 
                    ? '' 
                    : 'search-item-hide'}`}>
                        
                {props.array.map(
                    (airplane, key) => 
                        <Item airplane={airplane} onValueChange={props.onValueChange} key={key}/>
                )}
            </div>
        </div>
    );
}

SearchList.propsTypes = {
    array: PropsTypes.array,
    placeholder: PropsTypes.string,
    value: PropsTypes.string,
    onValueChange: PropsTypes.func
}

export default SearchList;