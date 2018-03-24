const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl', '.node']
  }
}
