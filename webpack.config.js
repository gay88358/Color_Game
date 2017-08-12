var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        main: ['babel-polyfill', './main.js'],
        vendor: ['lodash'] // extract the lodash module from the other bundle file
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js' // main.bundle.js
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'es2015', {
                                        module: false
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // css-loader: css->module, style-loader: add style to DOM
                // perform from back to the front
            }
        ]
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js', minChunks: 2})]
    // speed up the time on the watch mode
}