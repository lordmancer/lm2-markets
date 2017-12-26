import React, { Component } from 'react';
import { 
  Layout, 
  Panel, 
  AppBar, 
  ProgressBar,
  NavDrawer, 
  Navigation, 
  Link, 
  Input, 
  Button,
  Tabs,
  Tab,
  Table, TableHead, TableRow, TableCell
} from 'react-toolbox';
import { connect } from 'react-redux'

import Resources from './Resources.jsx';
import Things from './Things.jsx';
import {loadMarkets} from '../actions.js';

class Markets extends Component {
  constructor(props) {
     super(props);
     this.state = {
       index: 0
     };
  }

  componentDidMount() {
    this.props.dispatch(loadMarkets(this.props.lang))
  }
  
  render() {
    return (
      <div>

          { !this.props.markets &&
            <div style={{textAlign: "center"}}>
              <ProgressBar type="circular" mode="indeterminate" />
            </div>
          }
          { !!this.props.markets &&
            <Tabs index={this.state.index} onChange={(index) => this.setState({index})} fixed>
              <Tab label='Group by Cities'>
                {
                  this.props.markets.map( (market) =>
                    <p key={market.locationId + "/" + market.cityId}>
                      <h3>{this.props.langRes["location." + market.locationId]} / {this.props.langRes["teleport.name." + market.locationId + "/" + market.cityId]}</h3>
                      <div style={{ paddingLeft: "1em" }}>
                        { market.resLots.length > 0 &&
                          <Resources lots={market.resLots}/>
                        }
                        { market.thingLots.length > 0 &&
                          <Things lots={market.thingLots}/>
                        }
                        { (market.resLots.length == 0 && market.thingLots.length == 0) &&
                          <p>
                            There are no any items on market in the city.
                          </p>
                        }
                      </div>
                    </p>
                  )
                }
              </Tab>
              <Tab label='Group by Lots'>
                  { this.props.state.resLots.length > 0 &&
                    <Resources lots={this.props.state.resLots} showLocation={true}/>
                  }
                  { this.props.state.thingLots.length > 0 &&
                    <Things lots={this.props.state.thingLots} showLocation={true}/>
                  }
                  { (this.props.state.resLots.length == 0 && this.props.state.thingLots.length == 0) &&
                    <p>
                      There are no any items on market in the city.
                    </p>
                  }
              </Tab>
            </Tabs>
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    markets: state.markets,
    langRes: state.langRes,
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Markets)