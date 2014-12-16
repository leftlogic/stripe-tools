'use strict';
var fs = require('fs');
var path = require('path');

function createRecursiveStripeMethod(methodname) {

  return function (args) {
    var stripe = this.stripe;
    function addResultToList(list, start, callback) {
      list = list || [];
      var options = {};
      options.customer = args.customer;
      options.limit = 100;
      if (start) {
        options.starting_after = start;
      }
      stripe[methodname].list(options, function (error, result) {
        if (error) {
          return callback(error, null);
        }
        list = list.concat(result.data);
        if (result.data.length) {
          addResultToList(list, list[list.length - 1].id, callback);
        } else {
          callback(null, list);
        }
      });
    }
    addResultToList(null, null, function (error, results) {
      if (error) {
        throw error;
      }
      console.log(JSON.stringify(results));
      process.exit(0);
    });
  };

}

function auth(args) {
  fs.writeFileSync(path.resolve(__dirname + '/../apikey'), this.apikey);
  console.log('Succesful Auth');
  process.exit(0);
}

exports.customers = createRecursiveStripeMethod('customers');
exports.plans = createRecursiveStripeMethod('plans');
exports.invoices = createRecursiveStripeMethod('invoices');
exports.auth = auth;
