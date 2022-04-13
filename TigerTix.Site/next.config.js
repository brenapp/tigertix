/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const { config } = require('process');


module.exports = ({
    future : {
      webpack5: true,
    },
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs : false,
      }

      return config;
    },
    reactStrictMode: true,
    images: {
        domains: ["picsum.photos", "i.picsum.photos"],
    },
    pwa: {
      dest: "public"
    },
    externals : {
      express : "express"
    }
});
