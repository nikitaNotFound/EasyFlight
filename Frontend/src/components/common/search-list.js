import PropsTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Spinner from './spinner';
import Item from './search-list-item';
import MessageBox from '../common/message-box';

import '../../styles/search-list.css';
import { defaultErrorMessage } from './message-box-messages';

async function getStartItemName(props) {
    if (!props.currentItem) {
        return;
    }

    const startItemName = await props.getItemName(props.currentItem);

    return startItemName;
}

function SearchList(props) {
    const [loading, changeLoading] = useState(true);
    const [mode, changeMode] = useState(false);
    const [list, changeList] = useState([]);
    const [inputValue, changeInputValue] = useState();
    const [currentItem, changeCurrentItem] = useState(props.currentItem);
    const [messageBoxValue, changeMessageBoxValue] = useState(null);

    useEffect(() => {
        const setupData = async () => {
            const startItemName = await getStartItemName(props);

            changeInputValue(startItemName)
        }

        setupData();
    });

    function openList() {
        changeMode(true);
    }

    async function closeList() {
        if (currentItem) {
            changeInputValue(await props.getItemName(currentItem));
        } else {
            changeInputValue('');
        }
        changeMode(false);
    }

    async function searchItemChosen(item) {
        changeList([]);
        changeCurrentItem(item);
        changeInputValue(await props.getItemName(item));
        props.onValueChange(item);
    }

    async function onSearchPhraseChange(event) {
        changeInputValue(event.target.value);
        
        if (!event.target.value) {
            changeLoading(true);
            changeCurrentItem(null);
            props.onValueChange(null);
            return;
        } else {
            changeInputValue(event.target.value);
        }

        try {
            let newListResult = null;

            if (props.searchArgs) {
                newListResult = await props.searchFunc(event.target.value, ...props.searchArgs);
            } else {
                newListResult = await props.searchFunc(event.target.value);
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
                        getItemName={props.getItemName}
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

    return (
        <div className="form-item">
            {showMessageBox()}
            <label htmlFor={props.placeholder}>{props.placeholder}</label>
            <input
                id={props.placeholder}
                className="search-list-input"
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