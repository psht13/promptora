/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/(.*)", // Включає всі маршрути, що починаються з /api/
        headers: [
          {
            key: "Cache-Control",
            value: "no-store", // Забороняє кешування
          },
          {
            key: "Pragma",
            value: "no-cache", // Додатково для сумісності з HTTP/1.0
          },
          {
            key: "Expires",
            value: "0", // Дата закінчення терміну дії - "вже минула"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
