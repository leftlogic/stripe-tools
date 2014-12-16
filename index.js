'use strict';

var fs = require('fs');
var path = require('path');

var stripe = require('stripe');

var stripetools = require('./lib/stripetools');

function create(configstr) {
  var config;
  if (!configstr) {
    try {
      config = {
        apikey: fs.readFileSync(__dirname + '/apikey').toString()
      };
    } catch (e) {
      console.log('No auth supplied');
      process.exit(1);
    }
  } else if (configstr[0] === '@') {
    var configfile = configstr.slice(1);
    if (configfile.indexOf('/') === -1) {
      configfile = path.parse(process.cwd() + '/' + configfile);
    }
    config = fs.readFileSync(configfile);
  } else {
    try {
      config = JSON.parse(configstr);
    } catch (e) {
      config = {
        apikey: configstr
      };
    }
  }
  
  var instance = Object.create(stripetools);
  instance.config = config;
  instance.stripe = stripe(config.apikey);
  instance.apikey = config.apikey;

  return instance;
}

exports.create = create;
