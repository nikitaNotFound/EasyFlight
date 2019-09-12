import PropsTypes from 'prop-types';
import React, {useState} from 'react';
import Spinner from './spinner';
import Item from './search-list-item';
import '../../styles/search-list.css';

function getStartItem(props) {
    if (!props.currentItem) {
        return;
    }

    return props.getItemName(props.currentItem);
}

function SearchList(props) {
    const [loading, changeLoading] = useState(true);
    const [mode, changeMode] = useState(false);
    const [list, changeList] = useState([]);
    const [inputValue, changeInputValue] = useState(getStartItem(props));
    const [currentItem, changeCurrentItem] = useState(props.currentItem);

    function openList() {
        changeMode(true);
    }

    function closeList() {
        if (currentItem) {
            changeInputValue(props.getItemName(currentItem));
        } else {
            changeInputValue('');
        }
        changeMode(false);
    }

    function searchItemChosen(item) {
        changeInputValue(props.getItemName(item));
        changeCurrentItem(item);
        props.onValueChange(item);
    }

    function getList() {
        if (loading) {
            return <Spinner headline="Waiting..."/>
        }

        return (
            list.map(
                (item, key) => 
                    <Item
                        item={item}
                        getItemName={props.getItemName}
                        onValueChange={searchItemChosen}
                        key={key}
                    />
            )
        );
    }

    function onSearchPhraseChange(event) {
        changeInputValue(event.target.value);

        if (!event.target.value) {
            changeLoading(true);
            changeCurrentItem(null);
            props.onValueChange(null);
            return;
        }

        let newListLoading = props.searchFunc(event.target.value, props.searchArgs);

        newListLoading
            .then(newList => {
                changeList(newList);
                changeLoading(false);
            })
            .catch(error => {
                alert(error);
            });
    }

    return (
        <div className="form-item">
            <label htmlFor={props.placeholder}>{props.placeholder}</label>
            <input
                id={props.placeholder}
                type="text"
                value={inputValue}
                autoComplete="off"
                name={props.placeholder}
                placeholder={props.placeholder}
                onFocus={openList}
                onBlur={closeList}
                onChange={onSearchPhraseChange}
            />

            <div className={`search-list non-selectable 
                ${mode === true 
                    ? '' 
                    : 'search-item-hide'}`}>

                {getList()}
            </div>
        </div>
    );
}

SearchList.propsTypes = {
    searchFunc: PropsTypes.func,
    searchArgs: PropsTypes.array,
    placeholder: PropsTypes.string,
    currentItem: PropsTypes.object,
    getItemName: PropsTypes.func,
    onValueChange: PropsTypes.func
}

export default SearchList;