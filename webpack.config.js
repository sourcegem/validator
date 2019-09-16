const path = require('path');

module.exports = function(env, argv)
{
	return {
		entry:   './src/index.ts',

		output: {
			filename: 'validator' + (argv.mode === 'production' ? '.min' : '') + '.js',
			path:     path.resolve(__dirname, 'dist'),

			libraryTarget: 'window',
			library:       'Validator'
		},

		module: {
			rules: [
				{
					test:   /\.tsx?$/,
					loader: 'ts-loader'
				}
			]
		},

		resolve: {
			extensions: ['.ts', '.tsx', '.js']
		}
	};
};
