/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.hdwallpaper.nu',
                port: '',
                pathname: '/wp-content/**'
            }
        ]
    }
}

module.exports = nextConfig
