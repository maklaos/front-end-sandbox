require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: ['./src/main/js/main.js', './src/main/scss/main.scss'],
    output: {
        path: path.resolve(__dirname, 'src/main/resources/public/js/')
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: "http://localhost:9191/",
            open: false,
            serveStatic: ['src/main/resources/public'],
            rewriteRules: [
                {
                    match: new RegExp('/static/css/main.css'),
                    fn: function() {
                        return '/css/main.css';
                    }
                },
                {
                    match: new RegExp('/static/js/main.js'),
                    fn: function() {
                        return '/js/main.js';
                    }
                },
                {
                    match: new RegExp('/static/js/map.js'),
                    fn: function() {
                        return '/js/map.js';
                    }
                },
            ],
            files: [{
                match: [
                    'src/main/resources/public/css/main.css',
                    'src/main/js/main.js',
                    'src/main/js/vanilla/map.js',
                    'src/main/js/**/*.vue',
                ],
                fn: function(event, file) {
                    if (event === 'change') {
                        const bs = require('browser-sync').get('bs-webpack-plugin');
                        console.log('\n - file has changed:', file);
                        if (file.split('.').pop() === 'css') {
                            bs.reload("*.css");
                        } else {
                            bs.reload("");
                        }
                    }
                },
            }],
        },{
            reload: false,
            name: 'bs-webpack-plugin'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
            chunkFilename: "../css/[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/main/js/vanilla',
                to: __dirname + '/src/main/resources/public/js',
                toType: 'dir'
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.scss|\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        ]
    },
    resolve: {
        alias: {
            vue: process.argv.includes("--watch") ? 'vue/dist/vue.js' : 'vue/dist/vue.min'
        }
    }
};

module.exports = config;