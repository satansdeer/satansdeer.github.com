---
id: TASK-001
title: Cut maksimivanov.com DNS over to direct Cloudflare Pages domains
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
labels:
  - cloudflare
  - dns
  - pages
  - recovery
milestone: m-0
dependencies: []
references:
  - wrangler.toml
  - wrangler.worker.toml
priority: high
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make Cloudflare Pages project `maksimivanov-com` own `maksimivanov.com` and `www.maksimivanov.com` directly. Current production traffic is live through Worker `maksimivanov-com-proxy` routes, while `npx wrangler pages project list --json` showed only `maksimivanov-com.pages.dev` as the Pages project domain. The target state is direct Pages custom domains with issued SSL and explicit canonical host behavior.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Cloudflare Pages project `maksimivanov-com` lists both `maksimivanov.com` and `www.maksimivanov.com` as active custom domains.
- [ ] #2 The `maksimivanov.com` DNS zone has Pages-compatible records for apex and `www`, with conflicting legacy records removed or replaced.
- [ ] #3 Cloudflare SSL for both hostnames is active and browser-safe.
- [ ] #4 `curl -I https://maksimivanov.com/`, `curl -I https://www.maksimivanov.com/`, and `curl -I https://maksimivanov.com/posts/javascript-this/` return the expected successful or canonical redirect responses.
- [ ] #5 The chosen canonical host behavior for apex vs `www` is documented in the task final summary.
<!-- AC:END -->
