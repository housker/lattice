const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context: `${__dirname}/client/src`,
  entry: `${__dirname}/client/src/index.jsx`,
  output: {
    path: `${__dirname}/client/dist`,
    filename: "bundle.js"
  },
  module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
              presets: ['es2015', 'react']
          }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },  
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${__dirname}/client/dist/index.html`,
        template: `${__dirname}/client/src/index.html`
      })
    ],
}