// HtmlWebpackPlugin === takes app's HTML file and injects all JS into it via dynamic script tag
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: { // webpack.common.js === M R TEU LO PP
    rules: [
      // for loader: tells webpack to process files AS WE IMPORT THEM into our project, e.g. Babel
      {
        test: /\.m?js$/, // "when importing file that ends with .mjs or .js, process it w/ Babel"
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel itself
          options: {
            presets: [
              '@babel/preset-react', // Babel for REACT -- i.e. to process JSX
              '@babel/preset-env', // Babel for ENV -- i.e. all ES --> ES5
            ],
            plugins: [
              '@babel/plugin-transform-runtime', // for additional features -- e.g. async await,
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
