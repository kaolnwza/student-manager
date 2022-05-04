/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    ip: '107.21.129.37',

  },
  nextConfig
}

