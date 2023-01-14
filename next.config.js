const unoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // * https://webpack.js.org/configuration/cache/
    // disable cache for hmr to work with unocss
    config.cache = dev ? false : true;
    config.plugins.push(
      unoCSS(),
    );
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    };
    return config;
  }
};

module.exports = nextConfig;
