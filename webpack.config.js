const path = require('path');

module.exports = {
  entry: {  
    bundle: './src/js/index.js',
    drawBundle: './src/js/draw.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};