import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Router from './Router.js';
import {Store} from './store';

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Router/>
            </Provider>
        )
    }
}

