---
id: TASK-002
title: Redeploy the fresh recovery commit to Cloudflare Pages
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
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
- [ ] #1 `npm run build` succeeds from a clean checkout or clean local working tree.
- [ ] #2 `npx wrangler pages deploy out --project-name maksimivanov-com --branch master` creates a new production deployment.
- [ ] #3 `npx wrangler pages deployment list --project-name maksimivanov-com` shows the latest deployment corresponds to current `master`.
- [ ] #4 Production smoke checks for homepage, `www`, `/feed`, and `/posts/javascript-this/` pass after the redeploy.
<!-- AC:END -->
