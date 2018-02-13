const path = require('path');

module.exports = {
  entry: {
    bundle: './front/entry.js',
    dice: './front/dice.js',
    computed_dice: './front/computed-dice.js',
    reaction_dice: './front/reaction-dice.js',
  },
  output: {
    path: path.join(__dirname, "/assets/javascripts"),
    filename: "[name].js"
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-runtime', 'transform-decorators-legacy']
      }
    }
    ]
  }
};
