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
  Link, 
  Redirect
} from 'react-router-dom'
import { RouterToUrlQuery } from 'react-url-query';

const store = createStore(todoApp, applyMiddleware(thunkMiddleware))

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <RouterToUrlQuery>
          <Switch>
              <Route exact path="/" render={() => <Redirect to="/lm2-markets/en/markets"/>} />
              <Route exact path="/lm2-markets" render={() => <Redirect to="/lm2-markets/en/markets"/>} />
              <Route exact path="/lm2-markets/en" render={() => <Redirect to="/lm2-markets/en/markets"/>} />
              <Route exact path="/lm2-markets/:id/markets" render={({match}) => <Page region={match.params.id}/>} />
          </Switch>
        </RouterToUrlQuery>
      </Router>
    </Provider>,
    document.getElementById('app')
  )

render()
store.subscribe(render)