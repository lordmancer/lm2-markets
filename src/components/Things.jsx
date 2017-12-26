import React, { Component } from 'react';
import { 
  Table, TableHead, TableRow, TableCell
} from 'react-toolbox';
import { connect } from 'react-redux'

import {loadMarkets} from '../actions.js';

class Things extends Component {

  render() {
    return (
      <div>
        <h4>Things</h4>
        <Table selectable={false} style={{ marginTop: 10 }}>
            <TableHead>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Currency</TableCell> 
              { this.props.showLocation &&
                <TableCell>Location</TableCell>
              }
              { this.props.showLocation &&
                <TableCell>City</TableCell>
              }
            </TableHead>
            {
              this.props.lots.map( (lot) => 
                  <TableRow key={lot.id}>
                    <TableCell>{this.props.langRes["stuff." + lot.stuff.thing.nameId + ".name"]}</TableCell>
                    <TableCell>{lot.stuff.thing.level}</TableCell>
                    <TableCell>{lot.price}</TableCell>
                    <TableCell>{lot.currency}</TableCell>
                    { this.props.showLocation &&
                      <TableCell>{this.props.langRes["location." + lot.locationId]}</TableCell>
                    }
                    { this.props.showLocation &&
                      <TableCell>{this.props.langRes["teleport.name." + lot.locationId + "/" + lot.cityId]}</TableCell>
                    }
                  </TableRow>
              )
            }
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    langRes: state.langRes,
    lang: state.lang
  };
};

export default connect(mapStateToProps)(Things)