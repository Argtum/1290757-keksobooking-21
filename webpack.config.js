const path = require("path");

module.exports = {
  entry: [
    "./js/data.js",
    "./js/util.js",
    "./js/map.js",
    "./js/card.js",
    "./js/state.js",
    "./js/pin.js",
    "./js/validation.js",
    "./js/render.js",
    "./js/filter.js",
    "./js/network.js",
    "./js/form.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
