var config = require('./webpack.config.dev.js');

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.entry.shift();
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
		new ExtractTextPlugin('bundle.css')
];

module.exports = config;
