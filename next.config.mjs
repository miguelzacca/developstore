/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developstore-api.up.railway.app',
        pathname: '/public/*',
      },
    ],
  },
}

export default nextConfig
