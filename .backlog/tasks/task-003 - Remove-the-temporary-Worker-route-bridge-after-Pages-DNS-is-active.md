---
id: TASK-003
title: Remove the temporary Worker route bridge after Pages DNS is active
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
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
- [ ] #1 Worker routes for `maksimivanov.com/*` and `www.maksimivanov.com/*` are removed only after direct Pages custom domains are active.
- [ ] #2 Worker service `maksimivanov-com-proxy` is deleted or clearly confirmed unused.
- [ ] #3 `workers/pages-proxy.js` and `wrangler.worker.toml` are removed from the repository if the Worker is no longer needed.
- [ ] #4 Production homepage, recovered post URL, feed URL, and legacy redirect URL still return expected responses after Worker removal.
<!-- AC:END -->
