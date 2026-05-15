---
id: TASK-007
title: Triage dependency vulnerabilities reported by GitHub
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
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
- [ ] #1 Critical and high Dependabot alerts are reviewed and categorized.
- [ ] #2 Safe dependency upgrades are applied with `npm run build` passing afterward.
- [ ] #3 Deferred alerts have a short rationale recorded in the task final summary.
- [ ] #4 No dependency changes break static export or Cloudflare Pages deployment.
<!-- AC:END -->
