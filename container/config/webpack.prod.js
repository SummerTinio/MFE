// merge === fxn to merge different webpack configs,
// COMMON + DEV in this case.
const { merge } = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// importing webpack config for processing (i.e. Babel) + HtmlWebpackPlugin
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// contains string of AWS url for remote entry files
// (all remote entry files from diff. MFE === hosted at same domain)
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  // will cause Webpack to work differently -- i.e. optimize build for production
  mode: 'production',
  output: {
    // contenthash for caching issues
    // all files will be built & named using this template
    filename: '[name].[contenthash].js',
  },
  plugins: [
    //  Modfed specifically for production.
    // e.g. remoteEntry links should  point to a prod-ready domain
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // must refer to specific AWS-domain
        marketing: `marketing@${domain}/marketing/remoteEntry.js`, // an assumption for now
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
