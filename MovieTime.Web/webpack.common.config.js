/* eslint import/no-extraneous-dependencies: 0 */

require('babel-polyfill');

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './ClientApp/boot.jsx',
    ],
    vendor: [
      'event-source-polyfill',
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-router-dom',
      'font-awesome/css/font-awesome.css',
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['env', 'react'],
              plugins: [
                'transform-class-properties',
                'transform-es2015-destructuring',
                'transform-object-rest-spread',
                'transform-async-to-generator',
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader?limit=25000',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'wwwroot', 'dist'),
      path.resolve(__dirname, 'Views/Shared/_Layout.cshtml'),
    ]),
    new HTMLWebpackPlugin({
      inject: true,
      filename: path.resolve(__dirname, 'Views/Shared/_Layout.cshtml'),
      template: path.resolve(__dirname, 'Views/Shared/_Layout_Template.cshtml'),
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'wwwroot', 'dist'),
    filename: '[name].js',
    publicPath: 'dist/',
  },
};
