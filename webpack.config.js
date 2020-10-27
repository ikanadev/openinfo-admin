const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    entry: './app/index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle-dev.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js|tsx|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        {
          test: /\.(ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          loader: 'file-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        /*{
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },*/
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'eval-source-map',
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: './app/index.html',
        filename: 'index.html',
      }),
      new webpack.DefinePlugin(envKeys),
      new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
  };
};
