const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { join } = require('path')

const webpackDevConf = require('./dev.renderer.conf')

webpackDevConf.entry.renderer = [join(__dirname, './dev-client.js')].concat(webpackDevConf.entry.renderer)
const webpackWebConf = webpackMerge(webpackDevConf, {
  target: 'web',
  devServer: {}
})
const compiler = webpack(webpackWebConf)
const hotMiddleware = webpackHotMiddleware(compiler, {
  // log: false,
  heartbeat: 2500
})

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data) => {
    hotMiddleware.publish({ action: 'reload' })
  })
})
compiler.plugin('done', stats => {
  // console.log('Renderer', stats)
})

new WebpackDevServer(
  compiler,
  {
    // quiet: true,
    before (app, ctx) {
      app.use(hotMiddleware)
      ctx.middleware.waitUntilValid(() => {
        console.log('Server starting in http://localhost:9080')
      })
    }
  }
).listen(9090)
