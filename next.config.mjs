/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "manabi-lilac.vercel.app",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
