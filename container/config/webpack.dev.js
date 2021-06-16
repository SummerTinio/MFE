// merge === fxn to merge different webpack configs (usually for production)
const { merge } = require('webpack-merge');

// HtmlWebpackPlugin === takes app's HTML file and injects all JS into it via dynamic script tag
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// importing webpack config for processing (i.e. Babel)
const commonConfig = require('./webpack.common');
// option 1. delegate updating of shared deps to webpack by importing package.json
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080, // 8080 for container, 8081 for marketing, +1 +1 for the other MFE's
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({ // Remote: NFES. Container: NRS
      // to import the remote: import ... from 'marketing/MarketingApp'
      name: 'container',
      remotes: {
        // BP - just keep the key same as the name prepended to @
        // no need for ./ or relative references. it's just the name.
        // i.e. 'marketing': 'marketing@ .....'
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // other options: shared: [] or shared: {} with singleton:true or :false options
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

// this is where u merge configs -- LEXICAL ORDER MATTERS. like a cascade!
// since devConfig comes last, it'll overwrite and take precedence over commonConfig
module.exports = merge(commonConfig, devConfig);
