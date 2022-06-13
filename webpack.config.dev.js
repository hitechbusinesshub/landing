const path = require('path');
const glob = require('glob');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  entry: {
    "styles": './src/bulma.scss',
    "icons": './src/icons.scss',
    //"common": './src/src.js',
  },
  //entry: './src/src.js',
  mode: 'production',
  output: {
    path: `${__dirname}/dist/`,
    //filename: "[name].[chunkHash:8][ext]",
    //chunkFilename: "[name].tedt.[ext]",
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: {
          method: 'render',
          esModule: false,
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: "asset",
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(svg)?$/,
        type: "asset/resource",
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)?$/,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            outputPath: 'img/',
            name: '[name]_[width].[ext]',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: './src/index.pug'}),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      //filename: 'css/styles.css',
      chunkFilename: '[name].[chunkHash:8][ext]',
    }),
  ],
};
