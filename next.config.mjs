/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developstore.up.railway.app',
        pathname: '/public/*',
      },
    ],
  },
}

export default nextConfig
