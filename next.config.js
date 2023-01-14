const isDev = process.env.NODE_ENV === "development";

const unoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // * https://webpack.js.org/configuration/cache/
    // disable cache for hmr to work with unocss
    config.cache = isDev ? false : true;
    config.plugins.push(
      unoCSS(),
    );
    if (!isDev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    };
    return config;
  },
  async headers() {
    if (!isDev) {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self';
                script-src 'self';
                child-src 'self';
                img-src 'self' data:;
                style-src 'self' 'unsafe-inline';
                font-src 'none'; 
              `.replace(/\s{2,}/g, ' ').trim()
            },
            {
              key: "Referrer-Policy",
              value: "origin-when-cross-origin"
            }
          ]
        }
      ]
    } else {
      return [];
    }
  }
};

module.exports = nextConfig;
