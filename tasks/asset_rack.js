/*
 * grunt-asset-rack
 * https://github.com/jamplify/grunt-asset-rack
 *
 * Copyright (c) 2013 Matt Roman
 * Licensed under the MIT license.
 */

'use strict';

var TASK_NAME = 'asset_rack'
  , TASK_DESC ='Compile and publish static assets with asset-rack'

module.exports = function(grunt) {

  grunt.registerMultiTask(TASK_NAME, TASK_DESC, function() {

    var options = this.options();

    var done = this.async()

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 // workaround for bucket name bug

    var assetsF = require(options.assetsFile)
    var assets = assetsF(options.assetConfig)

    assets.deploy(options.cloud, function(err) {
      if(err) {
        grunt.log.error(err)
        done(false)
      }
      grunt.log.writeln("Success: Deploy complete")
      done()
    })
  });
};
