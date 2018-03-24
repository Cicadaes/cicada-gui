const { resolve } = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { dependencies } = require('../package.json')
const webpackBase = require('./base.conf')
const outputDir = resolve(__dirname, '..', 'app')

let whiteListedModules = ['vue']

// external "url"?61e8:1 Uncaught ReferenceError: require is not defined
// Must running at Electron not Chrome
process.env.BABEL_ENV = 'renderer'

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    render: [
        './src/renderer/index.js'
      ]
  },
  output: {
    path: resolve(outputDir, 'renderer'),
    filename: '[name].js',
    publicPath: '/'
  },
  externals: [
    ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // [Vue warn]: You are using the runtime-only 
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
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
            test: /\.styl$/,
            // use: ExtractTextPlugin.extract('style', 'css!stylus') // ExtractTextPlugin.extract('style', 'css!postcss!stylus')
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader','stylus-loader']
            })
          },
          {
            test: /\.html$/,
            use: 'vue-html-loader'
          },
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.node$/,
            use: 'node-loader'
          },
          {
            test: /\.vue$/,
            use: {
              loader: 'vue-loader',
              options: {
                // extractCSS: process.env.NODE_ENV === 'production',
                loaders: {
                  stylus: 'vue-style-loader!css-loader!stylus-loader' // inline, .e.g <style type="text/css"></style>
                }
              }
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: {
              loader: 'url-loader',
              query: {
                limit: 10000,
                name: 'imgs/[name]--[folder].[ext]'
              }
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name]--[folder].[ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
              loader: 'url-loader',
              query: {
                limit: 10000,
                name: 'fonts/[name]--[folder].[ext]'
              }
            }
          }
    ]
  },
  devServer: {
    publicPath: '/',
    port: 9001,
    https: false // If true, `https://localhost:9001`
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: resolve(__dirname, '..', 'static', 'index.html')
    }),
    new ExtractTextPlugin('style.css') // file, .e.g <link href="./style.css" rel="stylesheet">
  ]
})