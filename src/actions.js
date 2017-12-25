import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import config from '../config.js';

const serverUrl = config.apiUrl

export function loadLangRes(lang) {
  return dispatch => {
    fetch(serverUrl + '/lang/' + lang)
      .then(res => {
        return res.text()
      })
      .then(res => {
        dispatch({
            type: 'LANG_LOADED',
            lang: lang,
            res: res
          })
      })
  }
}

export function loadMarkets(region) {
  return dispatch => {
    config.locationAndCities.forEach ( v => {
      const x = loadMarket(region, v.locationId, v.cityId)
      x(dispatch)
    })
  }
}

export function loadMarket(region, locationId, cityId) {
  return dispatch => {
    fetch(serverUrl + '/markets/' + region + '/'  + locationId + '/' + cityId + '/?levelFrom=0&levelTo=200')
      .then(res => {
        return res.json()
      })
      .then(json => {
        dispatch({
            type: 'MARKET_LOADED',
            locationId: locationId,
            cityId: cityId,
            lots: json.lots
          })
      })
  }
}