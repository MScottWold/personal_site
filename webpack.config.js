const path = require('path');

module.exports = {
  entry: {  
    bundle: './src/js/index.js',
    drawBundle: './src/js/draw.js',
    notFound: './src/js/not_found.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs/js'),
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