/** @type {import('next').NextConfig} */

const withNextPwa = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
})

const nextConfig = withNextPwa({
  reactStrictMode: true,
})

module.exports = nextConfig
