---
id: TASK-002
title: Redeploy the fresh recovery commit to Cloudflare Pages
status: Done
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-15 13:11'
labels:
  - cloudflare
  - deploy
  - pages
  - recovery
milestone: m-0
dependencies: []
references:
  - package.json
  - wrangler.toml
  - scripts/generate-static-assets.js
priority: high
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ensure the live Pages deployment is generated from the committed `master` source, not from an older upload or dirty working tree. Earlier recovery deployment was an upload deployment for Pages project `maksimivanov-com`; after Backlog cleanup commits, the current `master` commit should be built and deployed cleanly.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `npm run build` succeeds from a clean checkout or clean local working tree.
- [x] #2 `npx wrangler pages deploy out --project-name maksimivanov-com --branch master` creates a new production deployment.
- [x] #3 `npx wrangler pages deployment list --project-name maksimivanov-com` shows the latest deployment corresponds to current `master`.
- [x] #4 Production smoke checks for homepage, `www`, `/feed`, and `/posts/javascript-this/` pass after the redeploy.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Build the current committed master state with npm run build. 2. Deploy the generated out/ directory to Cloudflare Pages project maksimivanov-com on branch master using Wrangler with an explicit empty env file so .env.local does not override OAuth. 3. Confirm the latest Pages deployment lists the current commit/source. 4. Smoke test homepage, www, feed, and a recovered post URL. 5. Record results and mark the task done if all criteria pass.
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Completed a fresh production redeploy to Cloudflare Pages. `npm run build` succeeded and regenerated `out/`; existing non-blocking warnings were React Hook deps in `pages/_app.js`, use of `<img>` in `components/site/MarkdownContent.jsx`, and a skipped Google Fonts optimization download. Deployed `out/` with Wrangler to project `maksimivanov-com` on branch `master`, explicitly using an empty Wrangler env file so the repo `.env.local` DNS token did not override OAuth. New production deployment: `3d6286db-dd37-460a-8d70-ebf8459f0600`, URL `https://3d6286db.maksimivanov-com.pages.dev`, source `c53a4d1`. Smoke checks passed after deployment: `https://maksimivanov.com/` 200, `https://www.maksimivanov.com/` 200, `https://maksimivanov.com/feed` 200 with RSS content type, and `https://maksimivanov.com/posts/javascript-this/` 200. The direct deployment URL also served `/feed` and `/posts/javascript-this/` successfully.
<!-- SECTION:FINAL_SUMMARY:END -->
