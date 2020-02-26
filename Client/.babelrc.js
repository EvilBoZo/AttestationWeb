module.exports = function(api) {
  const isTest = process.env['BABEL_ENV'] === 'test';

  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        "modules": !isTest ? false : 'commonjs',
        "useBuiltIns": false
      }
    ],
    "@babel/typescript",
    "@babel/preset-react",
  ];

  const plugins = [
    "@babel/plugin-transform-flow-strip-types", // Обязательно должен быть выше @babel/plugin-proposal-class-properties иначе бага https://github.com/babel/babel/issues/8417
    "@babel/plugin-transform-runtime",
    "transform-class-display-name",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings",
    [ "@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-proposal-unicode-property-regex"
  ];

  if (isTest) {
    plugins.push('dynamic-import-node');
  }

  return {
    presets,
    plugins
  };
};