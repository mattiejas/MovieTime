require('@babel/polyfill');

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
  const isDevelopment = (env && env.dev) || (env && !env.prod) || true;

  return {
    mode: 'development',
    entry: {
      main: [
        '@babel/polyfill',
        './ClientApp/boot.jsx',
      ],
      vendor: [
        'event-source-polyfill',
        'isomorphic-fetch',
        'react',
        'firebase',
        'react-dom',
        'react-router-dom',
        'font-awesome',
      ],
    },
    devtool: 'inline-source-map',
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
            emitWarning: true,
          },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      shippedProposals: true,
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          exclude: /node_modules/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'wwwroot', 'dist')]),
      new HTMLWebpackPlugin({
        inject: true,
        filename: path.resolve(__dirname, 'Views/Shared/_Layout.cshtml'),
        template: path.resolve(__dirname, 'Views/Shared/_Layout_Template.cshtml'),
      }),
      new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 4000 }),
      new BundleAnalyzerPlugin(),
    ],
    optimization: {
      minimize: true,
    },
    output: {
      path: path.resolve(__dirname, 'wwwroot', 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: 'dist/',
    },
  };
};
