require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: ['./src/assets/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        host: 'localhost',
        port: 9000,
        hot: true,
        inline: true,
        watchOptions: {
            poll: true,
            ignored: '/node_modules/',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            title: 'Home'
        }),
        new HtmlWebpackPlugin({
            filename: 'category/index.html',
            template: './src/index.html',
            title: 'Category'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/static',
                to: __dirname + '/dist/static',
                toType: 'dir'
            }
        ], {debug:'debug'})
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                },
            },
            {
                test: /\.scss|\.css$/,
                use: [
                    process.argv.includes("--watch") ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'overrideBrowserslist': ['> 1%', 'last 2 versions', 'iOS > 9', 'Firefox ESR', 'dead']
                            })],
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/,
                loader: "file-loader",
                options: {
                    name: '/[path][name].[ext]',
                    context: 'src'
                },
            }
        ]
    },
    resolve: {
        alias: {
            vue: process.argv.includes("--watch") ? 'vue/dist/vue.js' : 'vue/dist/vue.min'
        }
    },
};

module.exports = config;
