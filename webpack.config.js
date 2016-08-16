/* global __dirname */
module.exports = {
    entry: ['./index'],
    output: {
        path: __dirname + '/built',
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/public/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }]
    }
}
