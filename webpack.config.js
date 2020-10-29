const path = require("path");

module.exports = {
  entry: [
    "./js/data.js",
    "./js/util.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/validation.js",
    "./js/render.js",
    "./js/filter.js",
    "./js/network.js",
    "./js/form.js",
    "./js/state.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
