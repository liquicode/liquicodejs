

const LIB_PATH = require( 'path' );

const LIB_WEBPACK = require( 'webpack' );
const LIB_UGLIFYJS_WEBPACK_PLUGIN = require( 'uglifyjs-webpack-plugin' );

const BASE_PATH = __dirname;
const COPYRIGHT = `Copyright (c) 2010-2022 Andre' G. Bowlin (http://liquicode.com)`;

const BABEL_PROCESSING_RULE = {
	// Only run `.js` files through Babel
	test: /\.m?js$/,
	exclude: [
		/(node_modules)/,
		/\.Tests\.js$/,
	],
	use: {
		loader: 'babel-loader',
		options: {
			presets: [ '@babel/preset-env' ]
		}
	}
};


//---------------------------------------------------------------------
let config = {
	mode: '',
	entry: [],
	module: {
		rules: [],
	},
	plugins: [
		new LIB_WEBPACK.BannerPlugin( COPYRIGHT ),
	],
	target: '',
	output: {
		path: '',
		filename: '',
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
};
module.exports = config;


//---------------------------------------------------------------------
switch ( process.env.WEBPACK_ENV )
{
	case 'es5': // EcmaScript 5, translated, ployfilled, minified, packaged
		config.mode = 'production';
		config.entry.push( 'babel-polyfill' );
		config.entry.push( './src/liquicode-es5.js' );
		config.module.rules.push( BABEL_PROCESSING_RULE );
		config.plugins.push( new LIB_UGLIFYJS_WEBPACK_PLUGIN() );
		config.target = 'web';
		config.output.path = LIB_PATH.resolve( BASE_PATH, '..', 'dist', 'es5' );
		config.output.filename = 'liquicode.es5.js';
		break;

	case 'es6': // EcmaScript 6, translated, ployfilled, minified, packaged
		config.mode = 'production';
		config.entry.push( 'babel-polyfill' );
		config.entry.push( './src/liquicode-es6.js' );
		config.plugins.push( new LIB_UGLIFYJS_WEBPACK_PLUGIN() );
		config.target = 'web';
		config.output.path = LIB_PATH.resolve( BASE_PATH, '..', 'dist', 'es6' );
		config.output.filename = 'liquicode.es6.js';
		break;

	case 'node-min': // NodeJS, minified, packaged
		config.mode = 'production';
		config.entry.push( './src/liquicode-node-min.js' );
		config.plugins.push( new LIB_UGLIFYJS_WEBPACK_PLUGIN() );
		config.target = 'node';
		config.output.path = LIB_PATH.resolve( BASE_PATH, '..', 'dist', 'node-min' );
		config.output.filename = 'liquicode.node-min.js';
		break;

	case 'node': // NodeJS, packaged only
		config.mode = 'development';
		config.entry.push( './src/liquicode-node.js' );
		config.target = 'node';
		config.output.path = LIB_PATH.resolve( BASE_PATH, '..', 'dist', 'node' );
		config.output.filename = 'liquicode.js';
		config.devtool = 'source-map';
		break;

	default:
		throw new Error( `The environment variable WEBPACK_ENV must be one of: 'es5', 'es6', 'node-min', or 'node` );
}

