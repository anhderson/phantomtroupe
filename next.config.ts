import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/executaveis/Project%20Zero%20Setup%201.0.4.exe',
        destination: 'https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.0/Project.Zero.Setup.1.0.4.exe',
        permanent: false,
      },
      {
        source: '/executaveis/Zero%20Signal%20Setup%201.0.10.exe',
        destination: 'https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.0/Zero.Signal.Setup.1.0.10.exe',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
