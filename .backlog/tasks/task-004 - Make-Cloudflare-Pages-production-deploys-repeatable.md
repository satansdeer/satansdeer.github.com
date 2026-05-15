---
id: TASK-004
title: Make Cloudflare Pages production deploys repeatable
status: In Progress
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-15 13:38'
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
modified_files:
  - .github/workflows/deploy-pages.yml
  - README.md
priority: medium
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Choose and implement one repeatable deployment path so future pushes do not depend on a local machine. Options are connecting Cloudflare Pages directly to the GitHub repository or adding a GitHub Actions workflow that builds with `npm run build` and deploys `out/` with Wrangler.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A documented production deployment path exists and can be run without relying on the original recovery shell session.
- [ ] #2 Required Cloudflare credentials are stored in the chosen platform's secret store, not committed to the repository.
- [ ] #3 A push to `master` can produce a fresh Cloudflare Pages deployment, or the documented manual fallback is explicit and tested.
- [x] #4 The README or another durable project document records the production deploy command and recovery fallback.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add a GitHub Actions workflow that builds the static export and deploys out/ to Cloudflare Pages on pushes to master or manual dispatch. 2. Document required GitHub Actions secrets and the manual Wrangler fallback in README.md. 3. Verify the workflow syntax and local build command. 4. Install or verify the required GitHub Actions secrets after GitHub CLI authentication and a Pages Write Cloudflare API token are available.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented .github/workflows/deploy-pages.yml as the repeatable production deployment path. The workflow runs on pushes to master and manual dispatch, installs dependencies, validates required Cloudflare secrets, builds the static export, and deploys out/ to Cloudflare Pages project maksimivanov-com with Wrangler. Replaced the default Next.js README with project-specific local build, production deploy, required GitHub Actions secrets, and manual recovery deploy documentation. Verification completed: workflow YAML parsed successfully with Ruby; git diff --check passed; npm run build completed and generated out/. Existing non-blocking build warnings remain: React Hook dependency in pages/_app.js, img usage in components/site/MarkdownContent.jsx, and skipped Google Fonts optimization download. Credential blocker: gh auth status reports the satansdeer GitHub token is invalid, so repository secrets could not be installed or verified. The local .env.local Cloudflare token returns Cloudflare 403 Authentication error for the Pages project API, so it is not a valid Pages deploy token. Remaining work is to re-authenticate gh as a repository admin and store CLOUDFLARE_ACCOUNT_ID plus a Cloudflare API token with Pages Edit / Pages Write in GitHub Actions secrets.
<!-- SECTION:NOTES:END -->
