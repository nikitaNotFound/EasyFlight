import PropsTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Spinner from './spinner';
import Item from './search-list-item';
import MessageBox from '../common/message-box';

import '../../styles/search-list.css';
import { defaultErrorMessage } from './message-box-messages';

async function getStartItemName(currentItem, getItemName) {
    if (!currentItem) {
        return;
    }

    const startItemName = await getItemName(currentItem);

    return startItemName;
}

function SearchList({searchFunc, searchArgs, currentItem, placeholder, getItemName, onValueChange, ...other}) {
    const [loading, changeLoading] = useState(true);
    const [mode, changeMode] = useState(false);
    const [list, changeList] = useState([]);
    const [inputValue, changeInputValue] = useState();
    const [item, changeItem] = useState(currentItem);
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const setupData = async () => {
            const startItemName = await getStartItemName(currentItem, getItemName);

            changeInputValue(startItemName)
        }

        setupData();
    }, [currentItem]);

    function openList() {
        changeMode(true);
    }

    async function closeList() {
        if (item) {
            changeInputValue(await getItemName(item));
        } else {
            changeList([]);
            changeLoading(true);
            changeInputValue('');
        }
        changeMode(false);
    }

    async function searchItemChosen(item) {
        changeList([]);
        changeItem(item);
        changeInputValue(await getItemName(item));
        onValueChange(item);
    }

    async function onSearchPhraseChange(event) {
        if (!event.target.value) {
            changeLoading(true);
            changeItem(null);
            onValueChange(null);
            changeInputValue('');
            return;
        } else {
            if (!inputValue && event.target.value === ' ') {
                changeInputValue('');
                return;
            }

            changeInputValue(event.target.value);
        }

        try {
            let newListResult = null;

            if (searchArgs) {
                newListResult = await searchFunc(event.target.value, ...searchArgs);
            } else {
                newListResult = await searchFunc(event.target.value);
            }

            changeList(newListResult);

            changeLoading(false);
        } catch {
            changeMessageBoxValue(defaultErrorMessage());
        }
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
                        getItemName={getItemName}
                        onValueChange={searchItemChosen}
                        key={key}
                    />
            )
        );
    }
    
    function showMessageBox() {
        if (messageBoxValue) {
            return (
                <MessageBox
                    message={messageBoxValue}
                    hideFunc={changeMessageBoxValue}
                />
            );
        }
    }

    return (
        <div className="form-item">
            {showMessageBox()}
            <label htmlFor={placeholder}>{placeholder}</label>
            <input
                id={placeholder}
                className="search-list-input"
                type="text"
                value={inputValue}
                autoComplete="off"
                name={placeholder}
                placeholder={placeholder}
                onFocus={openList}
                onBlur={closeList}
                onChange={onSearchPhraseChange}
                {...other}
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