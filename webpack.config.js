// npm i -D webpack webpack-cli
// npm i -D html-webpack-plugin
// npm i -D css-loader style-loader
// npm i -D file-loader
// npm i -D xml-loader csv-loader
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry:{
        main: './index.js',
        analytics: './analytics.js'
    },
    output:{
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    resolve:{
        alias:{
            "@Fonts" : path.resolve(__dirname, "src/assets/fonts"),
            "@Assets" : path.resolve(__dirname, "src/assets")
        }
    },
    plugins:[
        new HTMLWebpackPlugin({
            title: "Webpack",
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpeg|png|gif|jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/i,
                use: ["csv-loader"]
            }
        ]
    }
}