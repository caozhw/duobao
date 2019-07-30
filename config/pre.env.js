// 'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"pre"',
  BASE_API: '"https://api.jinxianghui.net/v200"',
  //BASE_API: '"http://api.btfq.net/v200"',//白条分期
  //BASE_API: '"http://api.sh-chaopai.com/v200"',//融e分期

})
