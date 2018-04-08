var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var glob = require('glob');
let soures = path.join(__dirname, 'src', 'js');
let entries = function () {
    let filepath = glob.sync(soures + '/*.{js,jsx}');
    // console.log(filepath);
    let map = {};
    for (let i = 0; i < filepath.length; i++) {
        var src = filepath[i];
        var filename = src.substring(src.lastIndexOf('\/') + 1, src.lastIndexOf('\.'));
        map[filename] = src;
    }
    return map;
};
console.log(entries());
module.exports = {
    entry: entries(),
    output: {
        path: __dirname + '/build/dist',
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                loader: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: ['html-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: '../index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/home.html',
            filename: '../home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/list.html',
            filename: '../list.html',
            chunks: ['list']
        })
    ]
};