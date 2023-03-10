module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'node': true,
		'jest/globals': true,
		'cypress/globals': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'react', 'cypress', 'jest'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'react/prop-types': 0,
	}
}
