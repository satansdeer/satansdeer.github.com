---
id: TASK-005
title: Clean repository and local recovery state
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
labels:
  - cleanup
  - repository
  - recovery
milestone: m-0
dependencies:
  - TASK-003
references:
  - .gitignore
  - wrangler.worker.toml
  - workers/pages-proxy.js
priority: medium
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Leave the restored site repository predictable after the DNS cutover. Current local worktree has a pre-existing untracked `logs/` directory, and recovery introduced temporary Worker bridge files that should disappear once direct Pages DNS is live.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `logs/` is either intentionally ignored or removed locally after confirming it has no needed recovery data.
- [ ] #2 Recovery-only Worker files are absent after the Worker bridge is retired.
- [ ] #3 Generated feeds, sitemap, redirects, and copied legacy assets are confirmed reproducible from committed scripts/source.
- [ ] #4 `git status --short --branch` is clean or contains only explicitly documented local-only files.
<!-- AC:END -->
