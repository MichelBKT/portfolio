const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports =
{
    entry: {
        bundle: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|ts)$/,
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
    resolve: {
        extensions: ['.*', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/build',
    },
    plugins:
            [
                new CopyPlugin({
                patterns: [
                    {
                        from: "images",
                        to: "./images/[path][name][ext]",
                    },
                    {
                        from: "fonts",
                        to: "./fonts/[path][name][ext]",
                    },
                    {
                        from: "./src/index.html",
                        to: "./[path][name][ext]",
                    }
                ],
                }),
                new MiniCssExtractPlugin({
                    filename: 'style.css',
                }),
            ]
}