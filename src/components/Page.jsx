import React, { Component } from 'react';
import { 
  List, 
  ListSubHeader, 
  ListItem, 

  Layout, 
  Panel, 
  AppBar, 
  ProgressBar, 
  NavDrawer, 
  Navigation, 
  Input, 
  Button,
  Dropdown
} from 'react-toolbox';

import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link, 
  Redirect
} from 'react-router-dom'
import { RouterToUrlQuery } from 'react-url-query';

import Markets from './Markets.jsx';
import config from '../../config.js';
import {loadLangRes, loadMarkets} from '../actions.js';

const countries = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU'},
];

class Page extends Component {
  constructor(props) {
     super(props);
     this.state = {
       value: this.props.lang
     };
  }

  componentDidMount() {
  }

  changeLang(l) {
    this.setState({value: l})
    this.props.dispatch(loadLangRes(l))
    this.props.dispatch(loadMarkets(l))
  }
  
  render() {
    return (
      <div>
        <Router>
          <Layout>
            <AppBar title="Lordmancer II Markets" fixed>
              <h4 style={{padding: "0.5em" }}>Languges/Region:</h4>
              <div style={{"color": "#000"}}>
                <Dropdown style={{"background": "#fff", "color": "#000", padding: "0.5em"}}
                    source={countries}
                    value={this.state.value}
                    onChange={(v) => this.changeLang(v)}
                  />
              </div>
            </AppBar>
            <NavDrawer active={false} pinned={true} clipped={true}>
                <div style={{textAlign: "center"}}>
                  <div><Link to='/markets'>Markets</Link></div>
                </div>
            </NavDrawer>
            <Panel>
                <RouterToUrlQuery>
                  <Switch>
                      <Route exact path="/" render={() => <Redirect to="/markets"/>} />
                      <Route exact path="/markets" render={() => <Markets/>} />
                  </Switch>
                </RouterToUrlQuery>
            </Panel>
          </Layout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Page)