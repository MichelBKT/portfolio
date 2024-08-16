"use strict";

var CopyPlugin = require("copy-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
var path = require('path');
var ASSET_PATH = process.env.ASSET_PATH || '/';
var webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    bundle: './index.js'
  },
  module: {
    rules: [{
      test: /\.(js|cjs|mjs|ts)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            targets: "defaults"
          }]]
        }
      }
    }, {
      test: /\.(css)$/,
      exclude: /node_modules/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource'
    }]
  },
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    minimizer: [new CssMinimizerPlugin({
      minimizerOptions: {
        preset: ["default", {
          discardComments: {
            removeAll: true
          }
        }],
        minimize: true,
        minimizer: [new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.cleanCssMinify
        })]
      }
    })]
  },
  resolve: {
    extensions: ['.*', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: ASSET_PATH
  },
  devServer: {
    "static": {
      directory: path.join(__dirname, './public')
    },
    compress: true,
    port: 8080
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [new CopyPlugin({
    patterns: [{
      from: "./asset/images",
      to: "./images/[path][name][ext]"
    }, {
      from: "./asset/fonts",
      to: "./fonts/[path][name][ext]"
    }, {
      from: "./src/index.html",
      to: "./[path][name][ext]"
    }]
  }), new MiniCssExtractPlugin({
    filename: './style.css'
  }), new webpack.DefinePlugin({
    'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
  })]
};
//# sourceMappingURL=webpack.config.js.map