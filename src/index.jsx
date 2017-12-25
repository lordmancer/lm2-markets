import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import Page from './components/Page.jsx';

import {loadLangRes} from './actions.js';
import {todoApp} from './reducers.js';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const store = createStore(todoApp, applyMiddleware(thunkMiddleware))

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Page/>
    </Provider>,
    document.getElementById('app')
  )

render()
store.dispatch(loadLangRes("en"))
store.subscribe(render)