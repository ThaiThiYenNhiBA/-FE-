// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['storage.googleapis.com', 'media.boundless-commerce.com'], // Thêm domain này để cho phép hình ảnh từ đây
//     },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows all hostnames
            },
        ],
    },
};

export default nextConfig;
