# Video To Post Workflow

Goal: turn a video into a standalone article that can rank without requiring the reader to watch the video first.

## Inputs

- YouTube URL.
- TikTok URL when the same topic performed better there.
- Transcript or detailed notes.
- Target query from Search Console or keyword research.
- Related existing posts for internal links.

## Source Queue

Use the YouTube channel, TikTok account, and `stats-dashboard` exports as the source backlog. Only consider videos published after the last recovered text post unless an older short-form video has unusually strong social proof.

For YouTube, ignore Shorts. The metrics sync stores `durationSeconds` from the YouTube API, and the website-side queue treats YouTube videos under 61 seconds as short-form. TikTok remains short-form by default.

Current cutoff:

- Last recovered text post: July 24, 2019.
- YouTube source: `../stats-dashboard/data/posts.json` and `https://www.youtube.com/feeds/videos.xml?user=satansdeer1`.
- TikTok source: `../stats-dashboard/data/posts.json`.
- Current social report: `docs/seo/social-content-opportunities.md`.

For each candidate, collect:

- Video URL and publish date.
- Platform performance: views, likes, comments, and engagement rate.
- Transcript when available.
- Short topic summary if the transcript is not available.
- Related existing post or project page for internal links.

If transcript extraction is not available from public endpoints, use `stats-dashboard` to download and transcribe the post:

```bash
cd ../stats-dashboard
make analyze-post ARGS='--post-id tiktok_7631569099822320918'
make analyze-post ARGS='--post-id youtube_mnfeiggq35o --platform youtube'
```

Then regenerate the website-side report:

```bash
npm run seo:social -- --output=docs/seo/social-content-opportunities.md
```

To prepare the next missing transcripts from the website repo, use the batch helper:

```bash
npm run seo:transcripts -- --platform=all --limit=5
npm run seo:transcripts -- --platform=youtube --limit=3
npm run seo:transcripts -- --platform=tiktok --limit=3
```

The helper is dry-run by default. Add `--run` to execute the generated `stats-dashboard` jobs:

```bash
npm run seo:transcripts -- --platform=youtube --limit=3 --run
```

When a transcript exists, create a structured conversion draft from the analysis folder:

```bash
npm run seo:post-draft -- --post-id=tiktok_7631897804771757334 --output=docs/seo/post-drafts/vibe-coding-codebase-map.md
npm run seo:post-draft -- --post-id=youtube_mnfeiggq35o --output=docs/seo/post-drafts/localization-with-source-text-keys.md
```

The draft includes source metadata, a post skeleton, and the transcript in an HTML comment for editing context. Do not publish the raw transcript.

## Article Shape

Use this structure by default:

```md
---
title: "Search-intent title, not necessarily the video title"
date: "YYYY-MM-DDT12:00:00.000Z"
categories: "React"
image: "thumb.jpg"
---

[Watch the video on YouTube](https://www.youtube.com/watch?v=VIDEO_ID)

Short direct answer to the query.

## What You Will Learn

- Outcome 1
- Outcome 2
- Outcome 3

## The Problem

Explain the real scenario the reader is trying to solve.

## Step 1: ...

Edited tutorial content with code, screenshots, or concrete examples.

## Common Mistakes

List mistakes that match the query intent.

## Exercise

Give one small task the reader can do after the article.

## Summary

Recap the takeaway and link to related posts.
```

## Conversion Rules

- Do not publish raw transcripts.
- Rewrite spoken sections into concise paragraphs.
- Add headings that match search intent.
- Add code blocks and concrete examples where the video only explains verbally.
- Embed or link the video near the top.
- Add 3-5 internal links to relevant existing posts.
- Add one exercise when the topic is tutorial-like.
- Keep the post narrower than the video if the video covers multiple topics.

## Selection Rules

Prioritize videos when at least one is true:

- Search Console shows impressions for the topic.
- Keyword Planner shows relevant search demand for the topic.
- `docs/seo/social-content-opportunities.md` shows strong social proof.
- There is an existing related post ranking in positions 5-20.
- The video maps to React, Git, JavaScript, TypeScript, or developer tooling.
- The video can answer a query with a durable tutorial, not only news or commentary.
- The video was published after the recovered blog archive stopped and can fill a visible freshness gap.

When Search Console is unavailable, use this fallback order:

1. Existing site authority.
2. Social proof from YouTube/TikTok.
3. Keyword Planner validation.
4. Transcript availability.

## Publishing Checklist

- Frontmatter title is specific and query-aligned.
- Date uses the intended publish date.
- Category matches an existing category unless a new cluster is intentional.
- Article has a canonical standalone intro.
- Video link works.
- Internal links point to relevant existing pages.
- `npm run build` passes.
- Search result in Pagefind returns the new post for its primary query.
