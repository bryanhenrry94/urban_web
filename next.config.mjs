/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
          'tenant1.urbanoacceso',
          'http://tenant1.urbanoacceso:3000/',
          'cdn.example.com',
          'urbanoaccesoapp.vercel.app',
          'writestylesonline.com',
          'localhost',
          'www.orbis.com.ar',
          'test.localhost'
      ],
  },
};

export default nextConfig;
