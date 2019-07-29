import React, {useState} from 'react';
import Filter from './flights/filter';
import Flights from './flights/flights';
import Switcher from './flights/switcher';

function Content () {
    const layoutMode = {
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
        <main className={`rounded ${mode}`}>
            <Switcher switcher= {swapFilterList}/>
            <Flights/>
            <Filter/>
        </main>
    );
}

export default Content;