# Search Console Workflow

Use Google Search Console as the source of truth for keyword decisions.

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
