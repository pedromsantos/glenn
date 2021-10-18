module.exports = {
	presets: [
	  ['@babel/preset-react', { runtime: 'automatic' }],
	  [
	    '@babel/preset-env',
	    {
	      corejs: {
		version: 3,
		proposals: true,
	      },
	      useBuiltIns: 'usage',
	    },
	  ],
	  '@babel/preset-typescript',
	],
	overrides: [],
      };
