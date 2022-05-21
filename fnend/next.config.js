/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    ip: '100.25.147.244',
    // ip: 'localhost',


  },
  nextConfig
}

