// merge === fxn to merge different webpack configs,
// COMMON + PROD in this case.
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
  // how files are (1) Named and (2) Referred to after being processed by Webpack
  output: {
    // contenthash for caching issues
    // all files will be built & named using this template
    // filename === for (1) Naming
    filename: '[name].[contenthash].js',
    // publicPath === for (2) Referencing. filename will be pre-pended with the public path
    // on the dynamic script tag added by HtmlWebpackPlugin
    publicPath: '/container/latest/',
  },
  plugins: [
    //  Modfed specifically for production.
    // e.g. remoteEntry links should  point to a prod-ready domain
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // must refer to specific AWS-domain
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, // an assumption for now
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
