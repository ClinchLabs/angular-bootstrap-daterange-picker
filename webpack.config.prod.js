const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        "angular-bootstrap-daterange-picker": path.resolve(__dirname, 'src', 'dateRangePicker.module.js'),
        "angular-bootstrap-daterange-picker.min": path.resolve(__dirname, 'src', 'dateRangePicker.module.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
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
                test:/\.html$/,
                use:['raw-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
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
            path.join(__dirname, "src"),
            "node_modules"
        ],
        //自动扩展文件后缀名，require('./style.css') => require('./style')
        extensions: ['.js','.css']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};