const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  return {
    entry: { main: './ClientApp/boot.jsx' },
    devtool: 'inline-source-map',
    resolve: { extensions: ['.js', '.jsx'] },
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
                plugins: ['transform-class-properties', 'transform-es2015-destructuring', 'transform-object-rest-spread'],
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          include: /ClientApp/,
          use: 'url-loader?limit=25000',
        },
        {
          test: /\.scss$/,
          include: /ClientApp/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader',
          }),
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
