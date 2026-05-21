const BODY = `410 Gone

The store.maksimivanov.com Shopify storefront has been sunset.
The canonical site is https://maksimivanov.com/.
`;

export default {
  async fetch() {
    return new Response(BODY, {
      status: 410,
      headers: {
        "cache-control": "public, max-age=3600",
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, noarchive, nosnippet",
      },
    });
  },
};
