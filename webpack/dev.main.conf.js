const { resolve } = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const webpackBase = require('./base.conf')
const outputDir = resolve(__dirname, '..', 'app')
const srcDir = resolve(__dirname, '..', 'src')

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  target: 'electron-main',
  entry: './src/main/index.js',
  output: {
    path: outputDir,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.js$/,
        include: srcDir,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false, // Tells webpack not to use the .babelrc file.
            presets: [
              ['env', { targets: { electron: '1.6.8' }, modules: false }],
              'stage-0'
            ],
            plugins: [
              'transform-runtime'
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development')
    // })
  ]
})
