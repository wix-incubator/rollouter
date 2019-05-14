const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	target: 'node',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /^((?!\.spec).)*\.ts$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					onlyCompileBundledFiles: true
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
		    parallel: true,
		    terserOptions: {
		      ecma: 6,
		    },
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
