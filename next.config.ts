import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const config: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default withNextIntl(config);
