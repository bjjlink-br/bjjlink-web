import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['github.com', 'i.ibb.co']
    }
};

export default withNextIntl(nextConfig);
