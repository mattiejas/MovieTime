require('@babel/polyfill');

const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const isDevelopment = (env && env.dev) || (env && !env.prod) || true;

  return {
    entry: { main: ['@babel/polyfill', './ClientApp/boot.jsx'] },
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
                presets: [
                  ['@babel/preset-env', { shippedProposals: true }],
                  '@babel/preset-react',
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          include: /ClientApp/,
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
  };
};
