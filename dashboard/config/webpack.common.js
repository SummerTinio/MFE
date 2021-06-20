const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: { // webpack.common.js === M R TEU LO PP
    rules: [
      // for loader: tells webpack to process files AS WE IMPORT THEM into our project, e.g. Babel
      {
        // for loading font files and images, ..
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [
          { loader: 'file-loader' },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/, // "when importing file that ends with .mjs or .js, process it w/ Babel"
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel itself
          options: {
            presets: [
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
    new VueLoaderPlugin(),
  ],
};
