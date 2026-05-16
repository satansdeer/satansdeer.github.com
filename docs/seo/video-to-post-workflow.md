# Video To Post Workflow

Goal: turn a video into a standalone article that can rank without requiring the reader to watch the video first.

## Inputs

- YouTube URL.
- Transcript or detailed notes.
- Target query from Search Console or keyword research.
- Related existing posts for internal links.

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
- There is an existing related post ranking in positions 5-20.
- The video maps to React, Git, JavaScript, TypeScript, or developer tooling.
- The video can answer a query with a durable tutorial, not only news or commentary.

## Publishing Checklist

- Frontmatter title is specific and query-aligned.
- Date uses the intended publish date.
- Category matches an existing category unless a new cluster is intentional.
- Article has a canonical standalone intro.
- Video link works.
- Internal links point to relevant existing pages.
- `npm run build` passes.
- Search result in Pagefind returns the new post for its primary query.
