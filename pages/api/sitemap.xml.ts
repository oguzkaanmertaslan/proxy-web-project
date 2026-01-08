import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

const SITE_URL = 'https://proxyinvestment.com';

// Static pages with their priorities and change frequencies
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/hakkimizda', priority: '0.8', changefreq: 'monthly' },
    { url: '/iletisim', priority: '0.8', changefreq: 'monthly' },
    { url: '/portfoy', priority: '0.9', changefreq: 'weekly' },
    { url: '/projeler', priority: '0.9', changefreq: 'weekly' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Fetch all listings from Supabase
        const { data: listings, error: listingsError } = await supabase
            .from('listings')
            .select('listing_uid, updated_at');

        if (listingsError) {
            console.error('Sitemap: Listings fetch error', listingsError);
        }

        // Fetch all projects from Supabase
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('id, updated_at');

        if (projectsError) {
            console.error('Sitemap: Projects fetch error', projectsError);
        }

        const today = new Date().toISOString().split('T')[0];

        // Generate sitemap XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add static pages
        for (const page of staticPages) {
            sitemap += `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        }

        // Add dynamic listing pages
        if (listings && listings.length > 0) {
            for (const listing of listings) {
                const lastmod = listing.updated_at
                    ? new Date(listing.updated_at).toISOString().split('T')[0]
                    : today;
                sitemap += `
  <url>
    <loc>${SITE_URL}/portfoy/${listing.listing_uid}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
            }
        }

        // Add dynamic project pages
        if (projects && projects.length > 0) {
            for (const project of projects) {
                const lastmod = project.updated_at
                    ? new Date(project.updated_at).toISOString().split('T')[0]
                    : today;
                sitemap += `
  <url>
    <loc>${SITE_URL}/projeler/${project.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
            }
        }

        sitemap += `
</urlset>`;

        // Set headers and send response
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
        res.status(200).send(sitemap);

    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).json({ error: 'Failed to generate sitemap' });
    }
}
