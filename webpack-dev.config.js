const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const buildPath = path.resolve(__dirname, 'build');
const clientPath = path.resolve(__dirname, 'client');

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		login: ['webpack-hot-middleware/client', path.resolve(clientPath, './login.js')],
		main: ['webpack-hot-middleware/client', path.resolve(clientPath, './main.jsx')]
	},
	mode: 'development',
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
					failOnError: false,
					failOnWarning: false
				}
			},
			{
				test: /\.jsx?$/,
				include: [clientPath],
				use: {
					loader: 'babel-loader?cacheDirectory',
					options: {
						babelrc: false,
						plugins: ["@babel/plugin-transform-runtime"],
						presets: ['@babel/env', '@babel/react']
					}
				}
			},
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'sass-loader']
			},
			{
				test: /\.(gif|jpg|png|svg)$/,
				loader: 'url-loader?limit=10000&name=images/[name].[hash].[ext]'
			},
			{
				test: /\.[ot]tf$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
				test: /\.woff2?$/,
				loader: 'url-loader?limit=30&name=fonts/[name].[ext]'
			},
			{
				test: /\.wav$/,
				loader: 'file-loader?name=sounds/[name].[ext]'
			}
		]
	},
	output: {
		filename: '[name].js',
		path: buildPath,
		publicPath: '/dev/'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.scss']
	},
	target: 'web'
};
