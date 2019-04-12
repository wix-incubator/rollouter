const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	target: 'node',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false
					}
				}
			})
		]
	},
	output: {
		globalObject: 'this',
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'rollouter',
		libraryExport: 'default',
		libraryTarget: 'umd'
	}
};
