const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',

    devServer: {
        hot: true,
        historyApiFallback: true
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: isDevelopment
            ? 'static/js/[name].js'
            : 'static/js/[name].[contenthash:8].js',
        chunkFilename: isDevelopment
            ? 'static/js/[name].chunk.js'
            : 'static/js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',

    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment
                ? 'static/css/[name].css'
                : 'static/css/[name].[contenthash:8].css',
            chunkFilename: isDevelopment
                ? 'static/css/[id].css'
                : 'static/css/[id].[contenthash:8].css',
        }),

        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        alias: {
            '': path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$|tsx/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [
                        isDevelopment && require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                },
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ['file-loader'],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};