---
id: TASK-003
title: Remove the temporary Worker route bridge after Pages DNS is active
status: Done
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-15 13:17'
labels:
  - cloudflare
  - worker
  - cleanup
  - recovery
milestone: m-0
dependencies:
  - TASK-001
references:
  - wrangler.worker.toml
  - workers/pages-proxy.js
modified_files:
  - wrangler.worker.toml
  - workers/pages-proxy.js
priority: high
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Remove the recovery-only Worker proxy once direct Pages custom domains are active. Current bridge is Worker `maksimivanov-com-proxy`, configured in `wrangler.worker.toml`, serving routes `maksimivanov.com/*` and `www.maksimivanov.com/*` by proxying to the Pages host. This task must not run until direct Pages DNS and SSL are verified.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Worker routes for `maksimivanov.com/*` and `www.maksimivanov.com/*` are removed only after direct Pages custom domains are active.
- [x] #2 Worker service `maksimivanov-com-proxy` is deleted or clearly confirmed unused.
- [x] #3 `workers/pages-proxy.js` and `wrangler.worker.toml` are removed from the repository if the Worker is no longer needed.
- [x] #4 Production homepage, recovered post URL, feed URL, and legacy redirect URL still return expected responses after Worker removal.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Verify direct Pages custom domains are active and production smoke checks pass before touching Worker routes. 2. List Cloudflare Worker routes for the maksimivanov.com zone and identify only the recovery bridge routes. 3. Delete the Worker routes and Worker service maksimivanov-com-proxy. 4. Remove workers/pages-proxy.js and wrangler.worker.toml from the repository. 5. Smoke test production URLs after removal and mark the task done if all checks pass.
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Removed the temporary Worker bridge after verifying Pages custom domains were active. Cloudflare Pages reported `maksimivanov.com` and `www.maksimivanov.com` active with validation and verification active. Deleted Worker routes `maksimivanov.com/*` and `www.maksimivanov.com/*` for script `maksimivanov-com-proxy`, then deleted the `maksimivanov-com-proxy` Worker service with Wrangler. Follow-up API/status checks showed no remaining bridge routes and no Worker script/service. Removed recovery-only repo files `workers/pages-proxy.js` and `wrangler.worker.toml`. Production smoke checks after removal passed: homepage `https://maksimivanov.com/` 200, `https://www.maksimivanov.com/` 200, recovered post `https://maksimivanov.com/posts/javascript-this/` 200, feed `https://maksimivanov.com/feed` 200, and legacy redirect `/posts/7-skills-of-an-effective-developer` 301 to `/posts/skills-of-an-effective-developer/`.
<!-- SECTION:FINAL_SUMMARY:END -->
