const nextConfig = {
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
    if (!options.isServer) {
      const { ModuleFederationPlugin } = options.webpack.container
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
    }
    return config
  },
}

module.exports = nextConfig
