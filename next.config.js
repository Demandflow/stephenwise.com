/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'static.ghost.org'],
  },
  env: {
    GHOST_API_URL: process.env.GHOST_API_URL,
    GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
  },
}

module.exports = nextConfig 