var amazon = require('amazon-product-api');
var ebay = require('ebay-api');
var config = require('../config')
var amazonClient = amazon.createClient({
  awsId: config.config.awsId,
  awsSecret: config.config.awsSecret,
  awsTag: config.config.awsTag
});




var database = []
var index = require('./index')
const md5 = require('md5')
var sid = []

const Product = require('./model').Product

const populateResponseArray = (response) => {
  var toReturn = []
  response.forEach(function(obj) {
    var toReturnObject = {}
    console.log("obj is ", obj)

    //add attribute to current object, checking for existence of attribute first
    if (obj['ItemAttributes'][0].Title){
      toReturnObject.title = obj['ItemAttributes'][0].Title[0];
      console.log("title is ", toReturnObject.title)
    }
    if (obj['ItemAttributes'][0].Brand){
      toReturnObject.brand = obj['ItemAttributes'][0].Brand[0];
      console.log("brand is ", toReturnObject.brand)
    }
    if (obj['ItemAttributes'][0].Color){
      toReturnObject.color = obj['ItemAttributes'][0].Color[0];
      console.log("color is ", toReturnObject.color)
    }
    if (obj['ItemAttributes'][0].Feature){
      toReturnObject.description = obj['ItemAttributes'][0].Feature[0];
      console.log("description is ", toReturnObject.description)
    }
    if (obj['ItemAttributes'][0].Manufacturer){
      toReturnObject.manufacturer = obj['ItemAttributes'][0].Manufacturer[0];
      console.log("manufacturer is ", toReturnObject.manufacturer)
    }
    if (obj['ItemAttributes'][0].ListPrice){
      toReturnObject.price = obj['ItemAttributes'][0].ListPrice[0]['FormattedPrice'][0];
      console.log("price is ", toReturnObject.price)
    }
    toReturnObject.source = "amazon"
    toReturn.push(toReturnObject)
  })

  return toReturn
}

const executeAmazonSearch = (req, res) => {
  var responseArray = []
  console.log("req is ", req)
  var query = req.body.query;
  amazonClient.itemSearch({
    keywords: query
  }, function(err, results, response) {
    if (err) {
      console.log("Error is", JSON.stringify(err, null, 4))
    } else {
      console.log("response[0][Item] is ", response[0]['Item'])
      responseArray = populateResponseArray(response[0]['Item']);

      //insert objects into database


      responseArray.forEach(function(item) {
          Product.create(item, function (err, small) {
            if (err) {
              console.log("ERROR")
              return handleError(err);
            }
          });
      })

      msg = {responseArray}
      res.json(msg)
    }
  });
}

  const executeEbaySearch = (req, res) => {
    var params = {
      keywords: [req.body.query],

      // add additional fields
      outputSelector: ['AspectHistogram'],
      paginationInput: {
        entriesPerPage: 100
      }
    };
    ebay.xmlRequest({
        serviceName: 'Finding',
        opType: 'findItemsByKeywords',
        appId: config.config.appId,
        params: params,
        parser: ebay.parseResponseJson    // (default)
      },
      // gets all the items together in a merged array
      function itemsCallback(error, itemsResponse) {
        responseArray = []
        if (error) throw error;
        var items = itemsResponse.searchResult.item;
        console.log('Found', items.length, 'items');

        for (var i = 0; i < items.length; i++) {
          var item = items[i]

          var title = item.title
          var price;
          var country;
          if (item.sellingStatus.currentPrice){
            price = "$" + item.sellingStatus.currentPrice.amount.toString()
          }
          if (item.country){
            country = item.country
          }
          var source = "ebay"
          responseArray.push({title, price, country, source})

        }

        responseArray.forEach(function(item) {
            Product.create(item, function (err, small) {
              if (err) {
                console.log("ERROR")
                return handleError(err);
              }
            });
        })

        msg = {responseArray}
        res.json(msg)
      });
  }

const getDb = (req, res) => {
    Product.find().lean().exec(function (err, products) {
       res.end(JSON.stringify(products, null, 3));
    })
}



module.exports = app => {
     app.post('/amazon/executeSearch', executeAmazonSearch),
     app.post('/ebay/executeSearch', executeEbaySearch),
     app.get('/getDb', getDb)
}
