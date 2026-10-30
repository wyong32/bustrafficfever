import { MetadataRoute } from 'next';
import levelsData from '@/data/levels.json';
import { blogPosts } from '@/data/blog-posts';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const siteUpdated = new Date('2026-10-30T00:00:00+08:00');

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: siteUpdated,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/levels/`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/find-level/`,
      lastModified: new Date('2026-10-30T00:00:00+08:00'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: siteUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/download/`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us/`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us/`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: siteUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service/`,
      lastModified: siteUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic level pages
  const levelPages = levelsData.map((level) => ({
    url: `${baseUrl}/levels/${level.id}/`,
    lastModified: siteUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...levelPages, ...blogPages];
}
