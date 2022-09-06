const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  return merge({
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.bundle.js",
    },
    mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpe?g|gif|png|svg)$/,
          use: "url-loader",
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv(),
      new HtmlWebpackPlugin({
        title: "MovieS App",
        minify: true,
        template: "public/index.html",
      }),
    ],
    devServer: {
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".tsx", ".ts"],
    },
  });
};
