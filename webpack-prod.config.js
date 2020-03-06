const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');
const clientPath = path.resolve(__dirname, 'client');

module.exports = {
	devtool: 'source-map',
	entry: {
		login: path.resolve(clientPath, './login.js'),
		main: path.resolve(clientPath, './main.jsx')
	},
	mode: 'production',
	module: {
		rules: [
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
				test: /\.wav$/,
				loader: 'file-loader?name=/sounds/[name].[ext]'
			}
		]
	},
	optimization: {
		minimizer: [new TerserPlugin()],
	},
	output: {
		filename: '[name].js',
		path: buildPath
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: path.resolve(clientPath, './favicon.ico') }
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css', '.scss']
	},
	target: 'web'
};
