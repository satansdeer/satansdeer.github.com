---
id: TASK-001
title: Cut maksimivanov.com DNS over to direct Cloudflare Pages domains
status: In Progress
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-15 12:10'
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
- [x] #2 The `maksimivanov.com` DNS zone has Pages-compatible records for apex and `www`, with conflicting legacy records removed or replaced.
- [ ] #3 Cloudflare SSL for both hostnames is active and browser-safe.
- [x] #4 `curl -I https://maksimivanov.com/`, `curl -I https://www.maksimivanov.com/`, and `curl -I https://maksimivanov.com/posts/javascript-this/` return the expected successful or canonical redirect responses.
- [ ] #5 The chosen canonical host behavior for apex vs `www` is documented in the task final summary.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Verify current Pages project domains, Worker routes, DNS records, and HTTP behavior. 2. Add or repair Pages custom domains for apex and www. 3. Update DNS records so apex and www point directly at the Pages project. 4. Validate SSL/domain activation and production HTTP behavior. 5. Record canonical host behavior and final verification in the task.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Current state verified on 2026-05-15: Cloudflare Pages project `maksimivanov-com` has custom domains `maksimivanov.com` and `www.maksimivanov.com`, but both are still `pending` with verification error `CNAME record not set`. Retried Pages domain validation through the Cloudflare Pages API and status remained pending. The Wrangler OAuth token is authenticated as `satansdeer@proton.me` and has `pages:write` plus `zone:read`, but DNS record API access fails with Cloudflare 403 authentication error when listing `/zones/{zone_id}/dns_records`; Wrangler OAuth scope list does not expose DNS Read/Write scopes. Completing this task requires DNS record edit access through the Cloudflare dashboard or a Cloudflare API token with DNS Write on the `maksimivanov.com` zone. Required DNS target remains CNAME/flattened CNAME to `maksimivanov-com.pages.dev` for apex and `www`.

DNS cutover applied on 2026-05-15. Removed the old proxied A records for `maksimivanov.com` and `www.maksimivanov.com`, both pointing at `139.144.78.153`. Created proxied CNAME records for `maksimivanov.com` and `www.maksimivanov.com` with content `maksimivanov-com.pages.dev` and automatic TTL. Retained Proton Mail MX/TXT records at the apex. DNS API verification confirms the expected CNAME records are present. Public smoke checks after the DNS change: `https://maksimivanov.com/` 200, `https://www.maksimivanov.com/` 200, `https://maksimivanov.com/posts/javascript-this/` 200, and legacy redirect `/posts/7-skills-of-an-effective-developer` 301 to `/posts/skills-of-an-effective-developer/`. Current canonical behavior is that both apex and `www` serve the site; no redirect between them is configured yet. Remaining blocker: the `.env.local` token is DNS-only, so Pages custom-domain activation/SSL status cannot be read through the Pages API; the old Wrangler OAuth refresh token is inactive. Need Pages Read/Write token or Cloudflare Dashboard confirmation before checking AC #1 and #3.
<!-- SECTION:NOTES:END -->
