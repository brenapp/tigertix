/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    reactStrictMode: true,
    images: {
        domains: ["picsum.photos, i.picsum.photos"],
    },
    pwa: {
      dest: "public"
    }
});

module.exports = nextConfig;
