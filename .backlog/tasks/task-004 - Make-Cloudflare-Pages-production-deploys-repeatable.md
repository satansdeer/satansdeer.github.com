---
id: TASK-004
title: Make Cloudflare Pages production deploys repeatable
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
labels:
  - deploy
  - automation
  - cloudflare
milestone: m-0
dependencies:
  - TASK-002
references:
  - package.json
  - wrangler.toml
priority: medium
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Choose and implement one repeatable deployment path so future pushes do not depend on a local machine. Options are connecting Cloudflare Pages directly to the GitHub repository or adding a GitHub Actions workflow that builds with `npm run build` and deploys `out/` with Wrangler.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A documented production deployment path exists and can be run without relying on the original recovery shell session.
- [ ] #2 Required Cloudflare credentials are stored in the chosen platform's secret store, not committed to the repository.
- [ ] #3 A push to `master` can produce a fresh Cloudflare Pages deployment, or the documented manual fallback is explicit and tested.
- [ ] #4 The README or another durable project document records the production deploy command and recovery fallback.
<!-- AC:END -->
