---
id: TASK-006
title: Audit recovered legacy URLs and feeds after final DNS cutover
status: To Do
assignee: []
created_date: '2026-05-15 10:30'
labels:
  - audit
  - links
  - recovery
milestone: m-0
dependencies:
  - TASK-001
  - TASK-003
  - TASK-002
references:
  - public/sitemap.xml
  - public/_redirects
  - content/legacy-posts
priority: medium
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Verify the restored static archive from the public production host after direct Pages DNS and Worker cleanup are complete. The site includes recovered legacy posts, post assets, feed files, redirects, category pages, book pages, and a sitemap.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Every URL in `https://maksimivanov.com/sitemap.xml` returns an expected successful response.
- [ ] #2 Representative legacy redirects, including `/posts/7-skills-of-an-effective-developer`, return expected redirect responses.
- [ ] #3 `/feed`, `/rss.xml`, `/atom.xml`, and `/feed.json` return valid feed content types and parseable content.
- [ ] #4 Sample post image assets return successful responses from production.
- [ ] #5 Any broken internal link discovered by the crawl is fixed or tracked as a new Backlog task with URL details.
<!-- AC:END -->
