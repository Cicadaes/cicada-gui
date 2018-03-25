const { resolve } = require('path')

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const webpackBase = require('./base.conf')
const outputDir = resolve(__dirname, '..', 'dll')

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  target: 'electron-renderer',
  entry: {
    vendor: [
      'vue'
    ]
  },
  output: {
    library: 'vendor',
    path: outputDir,
    filename: '[name].dll.js',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve(outputDir, 'manifest.dll.json'),
      name: '[name]'
    })
  ]
})
