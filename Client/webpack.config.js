'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ProductName = 'DirectumRX';

module.exports = (env, argv) => {

  const rules = [
    {
      test: /\.(ts|tsx|js|jsx)?$/,
      exclude: /node_modules|lib/,
      loader: 'babel-loader?cacheDirectory=true'
    },
    {
      test: /\.css?$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    },
    { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.ttf$/, loader: 'file-loader' },
    { test: /\.eot$/, loader: 'file-loader' },
    { test: /\.(png|jpg|gif|ico|svg)$/, loader: 'file-loader?name=images/[name].[ext]' }
  ];

  const plugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //https://webpack.js.org/plugins/ignore-plugin/#ignore-moment-locales
    new webpack.DefinePlugin({
      'PRODUCT_NAME': JSON.stringify(ProductName)
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' }
    ]),
    new HtmlWebpackPlugin({ title: 'Web App Template', template: 'src/index.html' }),
    new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', jquery: 'jquery' }),
    new ForkTsCheckerWebpackPlugin()
  ];

  const resolve = {
    modules: [ 'src', 'node_modules' ],
    extensions: [ '.tsx', '.ts', '.js' ]
  };

  return {
    entry: {
      app: [ '@babel/polyfill', 'whatwg-fetch', 'index.tsx' ],
    },
    resolve: resolve,
    output: {
      path: path.join(__dirname, 'bin'),
      filename: '[name].js'
    },
    module: {
      rules: rules
    },
    devtool: 'eval-source-map',
    plugins: plugins,
    resolveLoader: {
      modules: [ 'node_modules', 'etc' ]
    },
    stats: {
      assets: false,
      children: false,
      warningsFilter: []
    }
  };
};


function getBaseIssuerName(m) {
  while (m.issuer) {
    m = m.issuer;
  }

  return m.name || false;
}

