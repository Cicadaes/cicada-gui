const { resolve } = require('path')

const webpackMerge = require('webpack-merge')

const webpackDevConf = require('./dev.main.conf')

const outputDir = resolve(__dirname, '..', 'app')

module.exports = webpackMerge(webpackDevConf, {
  mode: 'production',
  // entry: resolve(outputDir, 'main.js'),
  output: {
    path: outputDir,
    // filename: '[name].js',
    filename: 'main.min.js'
  }
})
