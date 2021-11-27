const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "production",
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  target: 'node',
  plugins: [
    new Dotenv()
  ]
}
