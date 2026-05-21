# Keyword Planner Workflow

Search Console is still processing, so use Keyword Planner as the temporary demand signal.

Primary sources:

- Google Ads UI Keyword Planner export.
- Google Ads API `KeywordPlanIdeaService.GenerateKeywordIdeas` when API access is configured.

Official references:

- https://support.google.com/google-ads/answer/7337243
- https://developers.google.com/google-ads/api/docs/keyword-planning/generate-keyword-ideas
- https://developers.google.com/google-ads/api/docs/keyword-planning/overview

## Seed Lists

Start with seed terms from assets we already control:

- Existing archive: `react`, `javascript`, `git`, `github`, `typescript`, `react native`, `webpack`, `async await`.
- Git book posts: `git staging area`, `git commit`, `git log`, `git reset`, `merge conflicts`, `git remote origin`.
- Social winners: `claude code architecture`, `ai coding workflow`, `debug claude code`, `vibe coding`, `browser video editor`, `generate subtitles`.
- Product-adjacent video topics: `screen recorder`, `video editor for SaaS`, `automatic captions`, `programmatic video editing`, `remotion alternative`.

## Export

In Keyword Planner, generate ideas from the seed list and export the keyword ideas CSV.

Prepared seed upload:

```text
docs/seo/keyword-planner-seeds.csv
```

Preferred columns:

- Keyword
- Avg. monthly searches
- Competition
- Competition indexed value
- Top of page bid low range
- Top of page bid high range
- Three month change

The local analyzer accepts common variations of these column names.

Run:

```bash
npm run seo:keywords -- path/to/keyword-planner-export.csv --min-searches=10 --limit=50
```

## Selection Rules

Prioritize terms that satisfy at least two of these:

- They map to existing topical authority on the site.
- They match a high-performing YouTube or TikTok post in `docs/seo/social-content-opportunities.md`.
- They are tutorial, comparison, debugging, or exercise intent.
- Competition is low or medium.
- The term can support a narrow standalone article, not only a broad category page.

Avoid publishing against broad terms directly. Use broad terms as cluster labels and choose a more specific child query for the article.

## API Path

The API path needs a Google Ads developer token, OAuth access, and a customer ID. Use it later if repeated manual exports become annoying.

The useful endpoint is `KeywordPlanIdeaService.GenerateKeywordIdeas`. It can generate ideas from keywords, URLs, or both, with targeting such as language, geography, and search network.

Until that access is configured, the CSV export path is enough for planning.
