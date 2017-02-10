const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

var config = {
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src')
	],
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				WEBPACK: true
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.scss/,
				include: path.resolve(__dirname, 'src'),
				use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
					{
						loader: "sass-loader"
					}
				]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: [ 'react-hmre' ]
				}
			}
		]
	}
};

module.exports = config;
