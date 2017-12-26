import { combineReducers } from 'redux'

const initialState = {
  lang: "en",
  markets: [],
  lots: [],
  thingLots: [],
  resLots: [],
}

export function todoApp(state = initialState, action) {
  switch (action.type) {
    case 'LANG_LOADED':
      const strs = action.res.split("\n").map(x => {
        const vals = x.split("=", 2)
        return {
          key: vals[0], val: vals[1]
        }
      })
      
      var result = strs.reduce(function(map, obj) {
          map[obj.key] = obj.val;
          return map;
      }, {});
//      console.log(result)

      return Object.assign({}, state, {
        lang: action.lang,
        langRes: result
      })

    case 'MARKET_LOADED':
      const markets = state.markets.filter(m => !(m.locationId == action.locationId && m.cityId == action.cityId))
      markets.push(
          {
            locationId: action.locationId,
            cityId: action.cityId,
            lots: action.lots,
            resLots: action.lots.filter(lot => lot.stuff.$type == "Market.ResourcesStuff"),
            thingLots: action.lots.filter(lot => lot.stuff.$type == "Market.OneThingStuff.v2")
          }
      )

      const lots = state.lots.filter(m => !(m.locationId == action.locationId && m.cityId == action.cityId))
      action.lots.forEach (lot => {
        lot.locationId = action.locationId
        lot.cityId = action.cityId
        lots.push(lot)
      })
      console.log(lots)
      return Object.assign({}, state, {
        markets: markets,
        lots: lots,
        resLots: lots.filter(lot => lot.stuff.$type == "Market.ResourcesStuff"),
        thingLots: lots.filter(lot => lot.stuff.$type == "Market.OneThingStuff.v2")
      })

    default:
      return state
  }
}