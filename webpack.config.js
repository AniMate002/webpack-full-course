// npm i -D webpack webpack-cli
// npm i -D html-webpack-plugin
// npm i -D css-loader style-loader
// npm i -D file-loader
// npm i -D xml-loader csv-loader
// npm i -D webpack-dev-server
// при запуске webpack-dev-server папка dist станет ПУСТОЙ т.к все файлы будут записаны в оперативную память
// npm i -D copy-webpack-plugin
// npm i -D mini-css-extract-plugin
// npm i -D css-minimizer-webpack-plugin
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV
const isProd = !isDev


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
    optimization: {
        splitChunks:{
            chunks: 'all'
        },
        minimize: true,
        minimizer: [new CssMinimizerPlugin()]
    },
    devServer:{
        port: 3000
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
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, "src/assets/favicon.ico"),
                    to: path.resolve(__dirname, "dist") 
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].bundle.css'
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'] - так бы мы писали если бы не было MiniCssExtractPlugin и не хотели бы выносить CSS в отделный файл
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jpeg|png|gif|jpg|ico)$/,
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