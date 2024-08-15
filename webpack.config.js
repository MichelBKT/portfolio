const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');


module.exports =
    {
        entry: {
            bundle: './index.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|cjs|mjs|ts)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {targets: "defaults"}]
                            ],
                        }
                    },
                },
                {
                    test: /\.(css)$/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            "default",
                            {
                                discardComments: {removeAll: true},
                            },
                        ],
                        minimize: true,
                        minimizer: [
                            new CssMinimizerPlugin({
                                minify: CssMinimizerPlugin.cleanCssMinify,
                            },)
                        ]
                    },
                })],
        },
        mode: 'production',
        resolve: {
            extensions: ['.*', '.js']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './public'),
            publicPath: 'auto',
        },
       devServer: {
            static: {
               directory: path.join(__dirname, './public'),
            },
            compress: true,
            port: 8080,
       },
        performance: {
            hints: false
        },
        devtool: 'inline-source-map',
        plugins:
            [
                new CopyPlugin({
                    patterns: [
                        {
                            from: "./asset/images",
                            to: "./images/[path][name][ext]",
                        },
                        {
                            from: "./asset/fonts",
                            to: "./fonts/[path][name][ext]",
                        },
                        {
                            from: "./src/index.html",
                            to: "./[path][name][ext]",
                        }
                    ],
                }),
                new MiniCssExtractPlugin({
                    filename: './style.css',
                }),
            ]
    }
