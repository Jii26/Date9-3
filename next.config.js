/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.app.goo.gl'],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Add loader configuration for handling JavaScript files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    // Handle undici module specifically
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve('util/'),
        net: false,
        dns: false,
        tls: false,
        fs: false,
        path: false,
      };
    }

    return config;
  },
}