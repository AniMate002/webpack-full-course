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
// npm i -D terser-webpack-plugin
// npm i -D less less-loader
// npm i -D babel-loader @babel/core @babel/preset-env
// npm i -D @babel/plugin-transform-class-properties
// npm i -D @babel/preset-typescript
// npm i -D @babel/preset-react
// npm i react react-dom
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV
const isProd = !isDev

const babelOptions = preset => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-transform-class-properties"]
    }

    if(preset){
        options.presets.push(preset)
    }

    return options
}

const optimal = () => {
    const config = {
        splitChunks:{
            chunks: 'all'
        },
        // minimize: true,
        // minimizer: [new CssMinimizerPlugin()]
    }

    if(isProd){
        config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()]
    }

    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry:{
        main: './index.js',
        analytics: './analytics.js',
        babel: './babel.js',
        ts: './ts.ts'
    },
    output:{
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    optimization: optimal(),
    devServer:{
        port: 3000,
        hot: isDev
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
            template: './index.html',
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
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options:babelOptions()
                }
            },
            {
                test: /\.ts$/,
                use:{
                    loader: 'babel-loader',
                    options:babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                use:{
                    loader: 'babel-loader',
                    options: babelOptions("@babel/preset-react")
                }
            }
        ]
    }
}