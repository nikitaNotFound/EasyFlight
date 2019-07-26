import React, {useState} from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';

function Content () {
    let layoutMode = {
        List: 'list-only',
        Filter: 'filter-only'
    };

    const [mode, changeMode] = useState(layoutMode.List);

    function swapFilterList () {
        const newMode = mode === layoutMode.List 
            ? layoutMode.Filter 
            : layoutMode.List;

        changeMode(newMode);
    }

    return (
        <div className={`row ${mode}`}>
            <Switcher switcher= {swapFilterList}/>
            <Flights/>
            <Filter/>
        </div>
    );
}

export default Content;
