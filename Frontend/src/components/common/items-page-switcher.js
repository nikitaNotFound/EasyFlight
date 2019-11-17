import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import ArrowIcon from '../../icons/arrow-icon.png';

import '../../styles/items-page-switcher.css';

function canShowNext(props) {
    if ((props.currentPage + 1) * props.pageLimit >= props.totalItemsCount + props.pageLimit) {
        return false;
    }

    return true;
}

function canShowPervious(props) {
    if ((props.currentPage - 1) === 0) {
        return false;
    }

    return true;
}

export default function ItemsPageSwithcer(props) {
    const [showPervious, changeShowPervious] = useState(canShowPervious(props));
    const [showNext, changeShowNext] = useState(canShowNext(props));

    useEffect(() => {
        changeShowNext(canShowNext(props));
        changeShowPervious(canShowPervious(props));
    }, [props]);

    function onNext() {
        if ((props.currentPage + 1) * props.pageLimit >= props.totalItemsCount + props.pageLimit) {
            return;
        } else {
            props.onNext();
        }
    }

    function onPervious() {
        if ((props.currentPage - 1) === 0) {
            return;
        } else {
            props.onPervious();
        }
    }

    return (
        <div className="items-page-switcher">
            <button className={`pervious-page visible-${showPervious}`} onClick={onPervious}>
                <img src={ArrowIcon} alt="pervious page"/>
            </button>
            <div className="current-page">
                {props.currentPage}
            </div>
            <button className={`next-page visible-${showNext}`} onClick={onNext}>
                <img src={ArrowIcon} alt="next page"/>
            </button>
        </div>
    )
}

ItemsPageSwithcer.propsTypes = {
    onPervious: PropTypes.func,
    onNext: PropTypes.func,
    currentPage: PropTypes.number,
    pageLimit: PropTypes.number,
    totalItemsCount: PropTypes.number
}