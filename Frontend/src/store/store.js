import {createStore} from 'redux';
import reducer from './reducers/index';


const STORAGE_KEY = 'storage'

function saveState(state) {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialisedState);
}

function loadState() {
    const serialisedState = localStorage.getItem(STORAGE_KEY);

    if (!serialisedState) {
        return null;
    }

    return JSON.parse(serialisedState);
}

const oldState = loadState();
const store = createStore(reducer, oldState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;