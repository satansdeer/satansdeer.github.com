---
id: TASK-007
title: Triage dependency vulnerabilities reported by GitHub
status: Done
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-16 09:49'
labels:
  - security
  - dependencies
  - cleanup
milestone: m-0
dependencies: []
references:
  - package.json
  - package-lock.json
priority: medium
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
GitHub reported Dependabot vulnerabilities after the recovery pushes. Triage the alerts for `satansdeer/satansdeer.github.com`, prioritize critical and high issues, and separate production/runtime risk from build-only legacy dependency risk.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Critical and high Dependabot alerts are reviewed and categorized.
- [x] #2 Safe dependency upgrades are applied with `npm run build` passing afterward.
- [x] #3 Deferred alerts have a short rationale recorded in the task final summary.
- [x] #4 No dependency changes break static export or Cloudflare Pages deployment.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-05-16 triage: fetched live GitHub Dependabot alerts for satansdeer/satansdeer.github.com. GitHub showed 79 open alerts before this change: 4 critical, 32 high, 32 medium, 11 low; 17 runtime and 62 development. The major repository hygiene issue was that GitHub scanned yarn.lock while the deploy workflow actually installs with npm. Replaced the stale Yarn lock with package-lock.json and kept the workflow on npm install after npm ci reproduced an npm CLI internal Exit handler never called failure locally. Applied safe upgrades for the static export path: Next 12.1.6 to 15.5.18, React/React DOM 18.2.0, eslint-config-next 15.5.18, Prismic packages, PrismJS 1.30, Slice Machine UI 2.21.3, PostCSS 8.5.10+, and replaced the broad react-spring package with @react-spring/web. Added output: export for Next 15 static export and legacyBehavior on existing next/link usages. Added a narrow npm override so Next uses PostCSS 8.5.10 instead of its pinned vulnerable 8.4.31. Verification: npm audit --omit=dev reports 0 vulnerabilities; npm audit reports 4 remaining moderate dev-only Slice Machine/file-type findings; npm run lint passes with existing warnings; npm run build passes and exports 97 static pages to out/.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Critical and high alerts were reviewed and remediated through dependency upgrades and npm lockfile cleanup. Production/runtime dependency audit is clean with npm audit --omit=dev reporting 0 vulnerabilities, and npm run build passes for the Cloudflare Pages static export. Deferred items are 4 moderate dev-only Slice Machine/file-type alerts; they affect local slice-machine tooling, are not part of the generated static site runtime, and have no safe forward patch beyond the current Slice Machine major line at this time.
<!-- SECTION:FINAL_SUMMARY:END -->
