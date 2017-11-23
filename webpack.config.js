const path = require('path');

module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: path.join(__dirname, "/assets/javascripts"),
    filename: "bundle.js"
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader", // "babel-loader" is also a legal name to reference
      query: {
        presets: ["react", "es2015"],
        plugins: ['transform-class-properties']
      }
    }
    ]
  }
};

