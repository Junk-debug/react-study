/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/characters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
