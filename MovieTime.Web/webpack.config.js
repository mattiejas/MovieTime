const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    const cssDev = [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                modules: true,
                camelCase: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                includePaths: ['ClientApp/styles']
            }
        }
    ];

    const cssProd = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    camelCase: true,
                    importLoaders: 2,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                loader: 'postcss-loader'
            },
            {
                loader: 'sass-loader',
                includePaths: ['ClientApp/styles']
            },
        ]
    });

    const cssLoader = isDevBuild ? cssDev : cssProd;

    return [{
        stats: {modules: false},
        entry: {'main': './ClientApp/boot.jsx'},
        resolve: {extensions: ['.js', '.jsx']},
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: /ClientApp/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                },
                {
                    test: /\.scss$/,
                    include: /ClientApp/,
                    use: cssLoader
                },
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            // new webpack.SourceMapDevToolPlugin({
            //     filename: '[file].map', // Remove this line if you prefer inline source maps
            //     moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            // })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('[name].[contenthash].css')
        ])
    }];
}
;