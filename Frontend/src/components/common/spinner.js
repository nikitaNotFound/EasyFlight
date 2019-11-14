import React from 'react';

import LoadingIcon from '../../icons/loading-icon.png';

import '../../styles/spinner.css';

export default function Spinner() {
    return (
        <div className="spinner">
            <img src={LoadingIcon}/>
        </div>
    );
}