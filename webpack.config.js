const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        "index": path.resolve(__dirname, 'demo', 'index.js')
    },

    output: {
        path: path.resolve(__dirname, 'temp'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ['angularjs-annotate']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    query: {
                        name: 'assets/fonts/[name]_[hash].[ext]'
                    }
                }]
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "temp"),
        open: true,
        port: 8090
    },

    // devtool: "cheap-eval-source-map",

    externals: {
        angular: 'angular',
        jquery: 'jQuery',
        moment: 'moment'
    },

    resolve: {
        //从哪里开始查找模块
        modules: [
            path.join(__dirname, "dist"),
            path.join(__dirname, "demo"),
            "node_modules"
        ],
        //自动扩展文件后缀名，require('./style.css') => require('./style')
        extensions: ['.js', '.css']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        //     'window.jquery': 'jquery',
        //     moment: 'moment',
        //     'window.moment': 'moment',
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(__dirname, 'demo', 'index.html'),
            hash: false
        })
    ],

    stats: {
        modules: true,
        colors: true,
    },
    profile: true
};