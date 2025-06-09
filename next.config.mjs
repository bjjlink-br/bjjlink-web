import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['github.com', 'i.ibb.co', '4561a5ff23ce27a982981d5e7b734da7.r2.cloudflarestorage.com', 'cloudflare.r2.com']
    }
};

export default withNextIntl(nextConfig);
