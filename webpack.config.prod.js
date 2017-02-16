var config = require('./webpack.config.dev.js');

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: "bundle.css",
	disable: process.env.NODE_ENV === "development"
})

config.entry.shift();
config.output.path = path.resolve(__dirname, 'dist');
config.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src', 'assets'),
				to: path.resolve(__dirname, 'dist', 'assets')
			}
		]),
		extractSass
];

config.module = {
	rules: [
		{
			test: /\.scss/,
			include: path.resolve(__dirname, 'src'),
			use: extractSass.extract({
				use: [{
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}],
				fallback: "style-loader"
			})
		},
		{
			test: /\.js$/,
			loader: 'babel-loader',
			include: path.resolve(__dirname, 'src')
		}
	]
};

module.exports = config;
