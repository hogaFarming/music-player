const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const port = 8080

// 自动刷新，在页面添加监听 [1]
config.entry.unshift('webpack-dev-server/client?http://localhost:' + port)

// webpack热替换
config.entry.unshift('webpack/hot/dev-server')
if (config.plugins)
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
else
    config.plugins = [new webpack.HotModuleReplacementPlugin()]

let compiler = webpack(config)
new webpackDevServer(compiler, {
    hot: true,
    publicPath: config.output.publicPath // webpackDevServer 无法读取到publicPath，需要手动加
}).listen(port)

// [1]
// Inline mode with node.js API
// There is no inline: true flag in the webpack-dev-server configuration, because the webpack-dev-server module has no access to the webpack configuration. Instead the user must add the webpack-dev-server client entry point to the webpack configuration.
// http://webpack.github.io/docs/webpack-dev-server.html#inline-mode-with-node-js-api
