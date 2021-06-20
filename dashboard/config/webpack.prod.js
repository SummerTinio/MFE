const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

// importing common setup configs ala 'beforeEach'
// (i.e. Babel for processing + HtmlWebpackPlugin for dynamic script tags)
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // publicPath === to help Webpack find files needed by this MFE
    // "go to / (current domain), marketing/, latest/"
    publicPath: '/dashboard/latest/', // also necessary in development!
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      // still need filename: 'remoteEntry.js' even if it's above in output: {}
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
