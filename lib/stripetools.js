'use strict';

function customers(args) {
  var stripe = this.stripe;
  function addCustomersToList(list, start, callback) {
    list = list || [];
    var options = {
      limit: 100
    };
    if (start) {
      options.starting_after = start;
    }
    stripe.customers.list(options, function (error, result) {
      if (error) {
        return callback(error, null);
      }
      list = list.concat(result.data);
      if (result.has_more) {
        addCustomersToList(list, list[list.length - 1].id);
      } else {
        callback(null, list);
      }
    });
  }
  addCustomersToList(null, null, function (error, results) {
    if (error) {
      throw error;
    }
    console.log(JSON.stringify(results));
    process.exit(0);
  });
}

exports.customers = customers;
