const { resolve } = require('path')

const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BabiliPlugin = require('babili-webpack-plugin')

const webpackBase = require('./base.conf')
const outputDir = resolve(__dirname, '..', 'app')

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  target: 'electron-renderer',
  // bail: true,
  entry: {
    renderer: './src/renderer/index.js'
  },
  output: {
    path: resolve(outputDir, 'renderer'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, '..', 'src'),
        // exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            loaders: {
              stylus: 'vue-style-loader!css-loader!stylus-loader' // inline, .e.g <style type="text/css"></style>
            }
          }
        }
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
              minimize: true,
              sourceMap: true
            }
          }, 'stylus-loader'],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '../static/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
    // new BabiliPlugin()
  ]
})
