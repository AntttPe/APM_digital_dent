import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/badania', '/rd'],
        },
        sitemap: 'https://apmdental.pl/sitemap.xml',
    };
}
