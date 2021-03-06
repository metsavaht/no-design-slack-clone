import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Raven from 'raven-js';

import HelloWorld from 'components/HelloWorld';
import CursorApp from './containers/CursorApp';
import ChatAppSimple from './containers/ChatAppSimple';
import ChatApp from './containers/ChatApp';

import configureStore from './configureStore';


// Install Raven in production envs
if (process.env.NODE_ENV === 'production') {
    Raven.config(DJ_CONST.RAVEN_PUBLIC_DSN).install(); // eslint-disable-line
    // handle rejected promises
    window.addEventListener('unhandledrejection', (evt) => {
        Raven.captureException(evt.reason);
    });
    // If we have authenticated user, pass its data on to Raven
    if (DJ_CONST.user) {
        Raven.setUserContext({
            id: DJ_CONST.user.id,
            email: DJ_CONST.user.email,
            name: DJ_CONST.user.name,
        });
    }
}

function initCursor() {
    const store = configureStore();
    const elem = document.getElementById("cursor");
    if (!elem) {
        return;
    }

    ReactDOM.render(<Provider store={store}><CursorApp counter={100} /></Provider>, elem);
}

function initChat() {
    const store = configureStore();
    const elem = document.getElementById("chat");
    if (!elem) {
        return;
    }

    ReactDOM.render(<Provider store={store}><ChatApp /></Provider>, elem);
}

function initSimpleChat() {
    const store = configureStore({});
    const elem = document.getElementById("simple-chat");
    if (!elem) {
        return;
    }

    ReactDOM.render(<Provider store={store}><ChatAppSimple /></Provider>, elem);
}

function init() {
    const elem = document.getElementById("root");
    if (!elem) {
        return;
    }

    ReactDOM.render(<HelloWorld />, elem);
}


export {init, initCursor, initChat, initSimpleChat};
