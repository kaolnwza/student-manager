/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    ip: '54.144.22.88',
    // ip: 'localhost',


  },
  nextConfig
}

