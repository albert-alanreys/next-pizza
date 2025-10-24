import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,

	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'dist/**',
		'node_modules/**',
		'next-env.d.ts',
		'*.config.js',
		'*.config.mjs',
		'*.config.ts',
	]),

	{
		rules: {
			// React
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',

			// TypeScript
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',

			// General
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'prefer-const': 'warn',
		},
	},
]);

export default eslintConfig;
