/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    ip: '100.26.151.80',
    // ip: 'localhost',


  },
  nextConfig
}

