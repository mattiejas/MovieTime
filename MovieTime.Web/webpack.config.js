require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = !env || env.NODE_ENV !== 'production';
  const dev = {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          options: {
            fix: true,
            emitWarning: true,
          },
        },
        {
          test: /\.css$/,
          use: 'css-loader',
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
      ],
    },
    plugins: [],
  };

  const prod = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?minimize',
          }),
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  minimize: true,
                  importLoaders: 2,
                },
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        minChunks: Infinity,
      }),
    ],
  };

  return merge({
    entry: { main: ['babel-polyfill', './ClientApp/boot.jsx'] },
    devtool: 'inline-source-map',
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
          include: /ClientApp/,
          exclude: /(node_modules|bower_components)/,
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
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          include: /ClientApp/,
          use: 'url-loader?limit=25000',
        },
      ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/dist/vendor-manifest.json'), // eslint-disable-line global-require
      }),
    ],
    output: {
      path: path.resolve(__dirname, 'wwwroot', 'dist'),
      filename: '[name].js',
      publicPath: 'dist/',
    },
  }, isDevBuild ? dev : prod);
};
