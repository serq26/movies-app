const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production"
});

///////////////////

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// module.exports = () => ({
//   devtool: "inline-source-map",
//   mode: "production",
//   output: {
//     filename: "production.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.sa?css$/,
//         use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
//       },
//     ],
//   },
//   plugins: [new MiniCssExtractPlugin()],
// });

