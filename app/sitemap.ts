import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://garden-og.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://garden-og.vercel.app/order',
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
        },
    ]
}
