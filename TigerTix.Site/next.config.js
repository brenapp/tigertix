/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = ({
    reactStrictMode: true,
    images: {
        domains: ["picsum.photos", "i.picsum.photos"],
    },
    pwa: {
      dest: "public"
    }
});
