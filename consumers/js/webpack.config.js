const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 'development' or 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // This is a requirement of libdummy-js:
      // import of wasm files should yield the url of the file.
      {
        test: /\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader',
        // None of the below 'options' is essential. We just show some nice things
        // one can do here:
        options: {
          // Name can be arbitrary (possible by locateFile trick in libdummy-js):
          name: '[name]-[md4:hash:base62:9].[ext]',
          // Output path for wasm files can be arbitrary too:
          outputPath: 'wasm32',
        }
      }
    ],
  },
  plugins: [
    // This plugin takes our html template and adds the relevant script tag
    // for our js-bundle (this is convinient because we may change the bundle name
    // without remembering to change the script tag in the template):
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  // *If* libdummy-js would not use -s ENVIRONMENT=web, we had to do the following:
  /*
  resolve: {
    fallback: {
      'fs': false,
      'path': false,
    }
  },
  */
  // We use a feature of webpack which is currently classified as 'experimental':
  experiments: {
    // Because libdummy-js needs top-level-await:
    topLevelAwait: true,
  },
};
