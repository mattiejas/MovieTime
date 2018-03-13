require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = (env && env.dev) || (env && !env.prod) || true;

  const cssProd = ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
        camelCase: true,
        importLoaders: 2,
        sourceMap: false,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: false,
      },
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: false,
      },
    }],
  });

  const cssDev = [
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
  ];

  return {
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
          include: /ClientApp/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: ['env', 'react'],
                plugins: ['transform-class-properties', 'transform-es2015-destructuring', 'transform-object-rest-spread', 'transform-async-to-generator'],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          include: /ClientApp/,
          use: isDevBuild ? cssDev : cssProd,
        }, {
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
      new ExtractTextPlugin('site.css'),
    ],
    output: {
      path: path.resolve(__dirname, 'wwwroot', 'dist'),
      filename: '[name].js',
      publicPath: 'dist/',
    },
  };
};
