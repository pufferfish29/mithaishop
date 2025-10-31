const fetchEvents = async () => {
  return [{ slug: '1' }, { slug: '2' }];
};

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 10000,
  experimental: {
    appDir: true,
  },
  additionalPaths: async (config) => {
    const events = await fetchEvents();

    return [
      // Static pages
      { loc: `${config.siteUrl}/auth/login`, priority: 0.5 },
      { loc: `${config.siteUrl}/auth/signup`, priority: 0.5 },
      { loc: `${config.siteUrl}/dashboard`, priority: 0.6 },
      { loc: `${config.siteUrl}/events`, priority: 0.7 },
      { loc: `${config.siteUrl}/events/payment`, priority: 0.6 },

      // Dynamic event pages: /events/[id]
      ...events.map((event) => ({
        loc: `${config.siteUrl}/events/${event.slug}`,
        priority: 0.9,
        changefreq: 'daily',
      })),

      // Event ticket token pages: /events/ticket/[token]
      { loc: `${config.siteUrl}/events/ticket/sample-token`, priority: 0.6 },

      // Event select seats: /events/[id]/select-seats
      ...events.map((event) => ({
        loc: `${config.siteUrl}/events/${event.slug}/select-seats`,
        priority: 0.6,
      })),
    ];
  },
};
