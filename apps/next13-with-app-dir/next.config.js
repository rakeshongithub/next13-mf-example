const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  basePath: '/locations',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: false,
      },
    ]
  },
  webpack(config, options) {
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          app: 'react_remote_app@http://localhost:3000/remoteEntry.js',
        },
        exposes: {},
      })
    )

    return config
  },
}
