import PropsTypes from 'prop-types';
import React, {useState} from 'react';

function SearchList (props) {
    const [mode, changeMode] = useState(false);

    return (
        <div className="form-item">
            <label htmlFor={props.placeholder}>{props.placeholder}</label>
            <input id={props.placeholder} type="text" value={props.value} autoComplete="off"
                name={props.placeholder}
                placeholder={props.placeholder}
                onFocus={() => changeMode(true)} 
                onBlur={() => changeMode(false)}/>

            <div className={`search-list non-selectable 
                ${mode == true 
                    ? '' 
                    : 'search-item-hide'}`}>
                        
                {props.array.map(
                    (item, key) => 
                        <div className="search-item rounded" key={key}>
                            {item.name}
                        </div>
                )}
            </div>
        </div>
    );
}

SearchList.propsTypes = {
    array: PropsTypes.array,
    placeholder: PropsTypes.string,
    value: PropsTypes.string
}

export default SearchList;