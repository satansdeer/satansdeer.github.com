# Keyword Planner Validation Run

Started: 2026-05-16.

## Status

Local preparation is done. Actual Keyword Planner validation is blocked until a Google Ads Keyword Planner export is available.

Checked local inputs:

- No Keyword Planner export found in the website repo.
- No likely Keyword Planner export found in `~/Downloads`.
- No likely Keyword Planner export found in nearby workspace folders.
- Website `.env.local` only exposes a Cloudflare token name.
- `stats-dashboard/.env` exposes social platform credentials, not Google Ads API credentials.

## Seed File

Upload or paste this file into Google Ads Keyword Planner:

```text
docs/seo/keyword-planner-seeds.csv
```

It contains seed terms for:

- AI coding workflow and Claude Code architecture.
- Vibe-coded app architecture and refactoring.
- Secret management for developers.
- Browser video editor and app-demo video tooling.
- Git beginner tutorials and exercises.
- Existing React and JavaScript authority.

## What To Export

Export keyword ideas with these columns when available:

- Keyword
- Avg. monthly searches
- Competition
- Competition indexed value
- Top of page bid low range
- Top of page bid high range
- Three month change

## Analyzer Command

After exporting the CSV, run:

```bash
npm run seo:keywords -- path/to/keyword-planner-export.csv --min-searches=10 --limit=75
```

To save the report:

```bash
npm run seo:keywords -- path/to/keyword-planner-export.csv --min-searches=10 --limit=75 > docs/seo/keyword-planner-opportunities.md
```

## Expected Decisions

Use the export to answer:

- Which AI coding terms have real demand: `claude code architecture`, `vibe coding architecture`, `ai generated code maintainability`, or adjacent wording.
- Whether the next two high-performing TikTok drafts should target architecture, refactoring, or codebase mapping queries.
- Whether the secret-management draft has enough search demand to publish before the video-tooling cluster.
- Which Git terms still justify more posts after the current Git series.
- Whether `browser video editor`, `screen recording editor`, or `product demo video editor` is the strongest product-adjacent cluster.
