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
            this.props.markets.map( (market) =>
              <p>
                <h3>{this.props.langRes["location." + market.locationId]} / {this.props.langRes["teleport.name." + market.locationId + "/" + market.cityId]}</h3>
                <div style={{ paddingLeft: "1em" }}>
                  { market.resLots.length > 0 &&
                    <div>
                      <h4>Resources</h4>
                      <Table selectable={false} style={{ marginTop: 10 }}>
                          <TableHead>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Currency</TableCell>
                          </TableHead>
                          {
                            market.resLots.map( (lot) => 
                                <TableRow key={lot.id}>
                                  <TableCell>{this.props.langRes["stuff." + lot.stuff.id + ".name"]}</TableCell>
                                  <TableCell>{lot.stuff.count}</TableCell>
                                  <TableCell>{lot.price}</TableCell>
                                  <TableCell>{lot.currency}</TableCell>
                                </TableRow>
                            )
                          }
                      </Table>
                    </div>
                  }
                  { market.thingLots.length > 0 &&
                    <div>
                      <h4>Things</h4>
                      <Table selectable={false} style={{ marginTop: 10 }}>
                          <TableHead>
                            <TableCell>Name</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Currency</TableCell>
                          </TableHead>
                          {
                            market.thingLots.map( (lot) => 
                                <TableRow key={lot.id}>
                                  <TableCell>{this.props.langRes["stuff." + lot.stuff.thing.nameId + ".name"]}</TableCell>
                                  <TableCell>{lot.stuff.thing.level}</TableCell>
                                  <TableCell>{lot.price}</TableCell>
                                  <TableCell>{lot.currency}</TableCell>
                                </TableRow>
                            )
                          }
                      </Table>
                    </div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    markets: state.markets,
    langRes: state.langRes,
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Markets)