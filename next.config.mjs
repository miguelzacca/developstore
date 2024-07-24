/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developstore-api.up.railway.app',
        pathname: '/public/*',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '8080',
      //   pathname: '/public/*',
      // },
    ],
  },
}

export default nextConfig
