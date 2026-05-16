---
id: TASK-005
title: Clean repository and local recovery state
status: Done
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-16 07:46'
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
modified_files:
  - .gitignore
priority: medium
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Leave the restored site repository predictable after the DNS cutover. Current local worktree has a pre-existing untracked `logs/` directory, and recovery introduced temporary Worker bridge files that should disappear once direct Pages DNS is live.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `logs/` is either intentionally ignored or removed locally after confirming it has no needed recovery data.
- [x] #2 Recovery-only Worker files are absent after the Worker bridge is retired.
- [x] #3 Generated feeds, sitemap, redirects, and copied legacy assets are confirmed reproducible from committed scripts/source.
- [x] #4 `git status --short --branch` is clean or contains only explicitly documented local-only files.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect the untracked logs directory and decide whether to ignore or remove it. 2. Verify recovery-only Worker bridge files are absent from the repository and local tree. 3. Confirm generated feeds, sitemap, redirects, and legacy assets are produced from committed source/scripts by running the static build. 4. Update repository ignore rules or cleanup notes, record verification in Backlog, then commit and push the cleanup state.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Inspected the existing untracked logs directory. It contains only a tiny Puppeteer MCP startup log and matching audit metadata from 2026-05-15, not recovery content. Added logs/ to .gitignore so local runtime logs stay out of repository status without deleting local files. Verified recovery-only Worker bridge files are absent: wrangler.worker.toml and workers/pages-proxy.js do not exist locally and are not tracked by git. Ran npm run build, which executed scripts/generate-static-assets.js and regenerated static assets for 72 posts; the build completed successfully with the existing non-blocking warnings. Confirmed public generated artifacts are present: rss.xml, feed.xml, feed.json, atom.xml, sitemap.xml, _redirects, and _headers. Confirmed copied legacy post assets exist under public/posts with 130 files. git diff after the build showed no changes under public, scripts, content, or lib, so generated feeds, sitemap, redirects, headers, and copied legacy assets are reproducible from committed source/scripts. git status now contains only the intentional .gitignore and task metadata changes before commit.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Repository cleanup is complete. logs/ is intentionally ignored, recovery-only Worker bridge files are absent, generated feeds/sitemap/redirects/headers and copied legacy assets were verified reproducible by a clean npm run build, and the worktree is expected to be clean after committing this task update.
<!-- SECTION:FINAL_SUMMARY:END -->
