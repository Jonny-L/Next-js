const webpack = require('webpack')
const nextSourceMaps = require('@zeit/next-source-maps')()

module.exports = nextSourceMaps({
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
      })
    )

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    return config
  },
})
