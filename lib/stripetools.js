'use strict';

function createRecursiveStripeMethod(methodname) {

  return function (args) {
    var stripe = this.stripe;
    function addResultToList(list, start, callback) {
      list = list || [];
      var options = {
        limit: 100
      };
      if (start) {
        options.starting_after = start;
      }
      stripe[methodname].list(options, function (error, result) {
        if (error) {
          return callback(error, null);
        }
        list = list.concat(result.data);
        if (result.has_more) {
          addResultToList(list, list[list.length - 1].id);
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

exports.customers = createRecursiveStripeMethod('customers');
exports.plans = createRecursiveStripeMethod('plans');
