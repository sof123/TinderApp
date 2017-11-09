import resource, {COMPUTE} from '../actions'
var db = require('../../db')

const bindDoComputationToDispatch = () => (dispatch) => {
  var mostPopularColor = computeMostPopular(db, "color")
  var mostPopularManufacturer = computeMostPopular(db, "manufacturer")
  var averageDescriptionLength = computeAverageDescriptionLength(db)
  var averagePrice = computeAveragePrice(db)
  dispatch({type: COMPUTE, payload: [mostPopularColor, mostPopularManufacturer, averageDescriptionLength, averagePrice]})

}

const sendCredsAction = (userID, accessToken) => (dispatch) => {
  const credsObject = {userID, accessToken}
  console.log("in sendCreds action")
  return  resource('POST', 'login', credsObject).then(r =>
  (dispatch({
    type: 'loginToDo',
    //id: ownProps.id,
    payload: r
  })))
}

export const bindFetchUsersToDispatch = (dispatch) => () => {
  return resource('GET', 'users')
    .then(json =>{
      console.log("json is", json)
      dispatch({
        type: 'fetchUsers',
        payload: json
      })
    })
}

const bindGoToLandingToDispatch = () => (dispatch) => {
  dispatch({type: 'goToLandingToDo'})
}




function computeAverageDescriptionLength(dbFile) {
  var objectArray = dbFile['default']
  var totalLength = 0;
  var totalNumDescriptions = 0
  objectArray.forEach(function(product) {
    if (product['description']){
      totalLength += product['description'].length
      totalNumDescriptions+=1
    }
  });
  return {averageLength: totalLength/totalNumDescriptions}
}

function dollarToFloat(input) {
  var dollarString = ""
  for (var i = 1; i < input.length; i++){
    dollarString+=input.charAt(i)
  }
  var num = parseFloat(dollarString)
  return num
}

function computeAveragePrice(dbFile){
  var objectArray = dbFile['default']
  var ebayTotalPrice = 0
  var amazonTotalPrice = 0
  var ebayTotalCount = 0
  var amazonTotalCount = 0
  objectArray.forEach(function(product) {
    if (product['price']){
      if (product['source'] == 'ebay') {
        ebayTotalPrice += dollarToFloat(product['price'])
        ebayTotalCount+=1
      }
      else if (product['source'] == 'amazon') {
        amazonTotalPrice += dollarToFloat(product['price'])
        amazonTotalCount+=1
      }
    }
  });
  return {ebayAveragePrice: "$" + (ebayTotalPrice/ebayTotalCount).toFixed(2),
          amazonAveragePrice: "$" + (amazonTotalPrice/amazonTotalCount).toFixed(2)}
}

function computeMostPopular(dbFile, attribute, callback) {
  var objectArray = dbFile['default']
  var attributeToCount = {}
  objectArray.forEach(function(product) {
    if (product[attribute]){
      attributeToCount[product[attribute]] = 0
    }
  });

  //increment all
  objectArray.forEach(function(product) {
    if (product[attribute]){
      attributeToCount[product[attribute]] += 1
    }
  });

  var biggestAttribute;
  var biggest = 0;
  for (var att in attributeToCount){
    if (attributeToCount[att] >= biggest){
      biggestAttribute = att
      biggest = attributeToCount[att]
    }
  }
  return {attribute: biggestAttribute, count: biggest, attributeType: attribute}
}

export {bindDoComputationToDispatch, bindGoToLandingToDispatch, sendCredsAction}
