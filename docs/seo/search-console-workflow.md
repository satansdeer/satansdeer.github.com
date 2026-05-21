# Search Console Workflow

Use Google Search Console as the source of truth for keyword decisions.

## API Access

This repo can use live Search Console data with a local OAuth desktop client.
Secrets stay outside the repo:

- OAuth client: `~/.config/codex/secrets/google-search-console-oauth-client.json`
- OAuth token: `~/.config/codex/secrets/google-search-console-token.json`

Authorize once:

```sh
npm run seo:gsc:auth
```

Verify available properties:

```sh
npm run seo:gsc:sites
```

The active property is:

```sh
sc-domain:maksimivanov.com
```

Run a sitemap/live status audit for the indexability issues Google reported:

```sh
npm run seo:gsc:audit -- --property=sc-domain:maksimivanov.com --site-url=https://maksimivanov.com --sitemap=public/sitemap.xml
```

Remove a stale submitted sitemap:

```sh
npm run seo:gsc:delete-sitemap -- --property=sc-domain:maksimivanov.com --sitemap-url=https://store.maksimivanov.com/sitemap.xml
```

The sunset `store.maksimivanov.com` host is served by the `maksimivanov-store-gone` Cloudflare Worker and should return `410 Gone` with `X-Robots-Tag: noindex` for every path.

Inspect one URL through Google's URL Inspection API:

```sh
npm run seo:gsc:inspect -- --property=sc-domain:maksimivanov.com --url=https://maksimivanov.com/
```

Pull current Search Analytics rows:

```sh
npm run seo:gsc:performance -- --property=sc-domain:maksimivanov.com --days=90 --limit=50
```

If the property is still processing and there is no performance data yet, use:

- `docs/seo/keyword-planner-workflow.md` for demand validation.
- `docs/seo/social-content-opportunities.md` for YouTube/TikTok-backed content priorities.

## Exports

Create two exports from **Performance > Search results**:

- Last 3 months: current opportunity set.
- Last 16 months: seasonality, decline, and durable winners.

Preferred columns:

- Query
- Page
- Clicks
- Impressions
- CTR
- Position

If Search Console only exports query-level or page-level CSVs, keep both. The analyzer accepts either, but query + page rows give better content decisions.

## Analysis

Run:

```sh
npm run seo:gsc -- path/to/search-console-export.csv --min-impressions=25
```

The report groups rows into:

- Defend: rankings already near the top.
- Quick Wins: positions 5-20 with meaningful impressions.
- CTR Gaps: top-10 rankings where title or description may underperform.
- Content Gaps: positions 20-60 where a stronger or more specific page may be needed.
- Expansion Candidates: pages that already attract many related queries.

## Planning Rules

Use this priority order:

1. Update existing pages in positions 5-20.
2. Rewrite titles/descriptions for high-impression top-10 CTR gaps.
3. Expand pages that attract many related queries.
4. Create new posts only when no existing page satisfies the query intent.
5. Use video transcripts and Git book chapters as source material, not as direct copies.
