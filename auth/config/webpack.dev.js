// merge === fxn to merge different webpack configs (usually for production)
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// importing webpack config for processing (i.e. Babel)
const devConfig = {
  mode: 'development',
  output: {
    // publicPath === to help Webpack find files needed by this MFE
    // "go to / (current domain), marketing/, latest/"
    // don't forget the slash at the end!
    publicPath: 'http://localhost:8082/', // also necessary in development!
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({ // Remote: NFES. Container: NRS
      // to import this,  import('marketing/MarketingApp')
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// this is where u merge configs -- LEXICAL ORDER MATTERS. like a cascade!
// since devConfig comes last, it'll overwrite and take precedence over commonConfig
module.exports = merge(commonConfig, devConfig);
