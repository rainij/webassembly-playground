const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // wasm files should not be processed but just be emitted and we want
      // to have their public URL.
      {
        test: /\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "",
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  // If libdummy-js would not use -s ENVIRONMENT=web, we had to do the following:
  /*
  resolve: {
    fallback: {
      'fs': false,
      'path': false,
    }
  },
  */
  experiments: {
    topLevelAwait: true, // Because libdummy-js needs top-level-await.
  },
};
