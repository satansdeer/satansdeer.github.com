const path = require('path');

module.exports = {
  entry: "./front/entry.js",
  output: {
    path: path.join(__dirname, "/assets/javascripts"),
    filename: "bundle.js"
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        plugins: ['transform-class-properties']
      }
    }
    ]
  }
};
