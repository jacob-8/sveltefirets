module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'packages/**/package/**/*'],
	overrides: [{ files: ['*.svelte', '*.svx'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		// ignore style tags in Svelte because of Windicss
    // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
    'svelte3/ignore-styles': () => true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-undef': 'off',
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
