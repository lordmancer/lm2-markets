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
       index: 0,
       nameFilter: ""
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
            <div>
              <Input type='text' label='Name filter' name='name' value={this.state.nameFilter} required onChange={(e)=>this.setState({nameFilter: e})}/>
              <Tabs index={this.state.index} onChange={(index) => this.setState({index})} fixed>
                <Tab label='Group by Lots'>
                    { this.props.state.resLots.length > 0 &&
                      <Resources lots={this.props.state.resLots} showLocation={true} nameFilter={this.state.nameFilter}/>
                    }
                    { this.props.state.thingLots.length > 0 &&
                      <Things lots={this.props.state.thingLots} showLocation={true} nameFilter={this.state.nameFilter}/>
                    }
                    { (this.props.state.resLots.length == 0 && this.props.state.thingLots.length == 0) &&
                      <p>
                        There are no any items on market in the city.
                      </p>
                    }
                </Tab>
                <Tab label='Group by Cities'>
                  {
                    this.props.markets.map( (market) =>
                      <p key={market.locationId + "/" + market.cityId}>
                        <h3>{this.props.langRes["location." + market.locationId]} / {this.props.langRes["teleport.name." + market.locationId + "/" + market.cityId]}</h3>
                        <div style={{ paddingLeft: "1em" }}>
                          { market.resLots.length > 0 &&
                            <Resources lots={market.resLots} nameFilter={this.state.nameFilter}/>
                          }
                          { market.thingLots.length > 0 &&
                            <Things lots={market.thingLots} nameFilter={this.state.nameFilter}/>
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
              </Tabs>
            </div>
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