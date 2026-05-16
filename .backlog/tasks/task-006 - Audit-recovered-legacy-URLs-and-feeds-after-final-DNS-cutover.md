---
id: TASK-006
title: Audit recovered legacy URLs and feeds after final DNS cutover
status: Done
assignee: []
created_date: '2026-05-15 10:30'
updated_date: '2026-05-16 09:04'
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
- [x] #1 Every URL in `https://maksimivanov.com/sitemap.xml` returns an expected successful response.
- [x] #2 Representative legacy redirects, including `/posts/7-skills-of-an-effective-developer`, return expected redirect responses.
- [x] #3 `/feed`, `/rss.xml`, `/atom.xml`, and `/feed.json` return valid feed content types and parseable content.
- [x] #4 Sample post image assets return successful responses from production.
- [x] #5 Any broken internal link discovered by the crawl is fixed or tracked as a new Backlog task with URL details.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Fetch and validate the production sitemap from maksimivanov.com. 2. Check every sitemap URL for expected successful HTTP responses. 3. Check representative legacy redirects, feed endpoints, and sample post image assets. 4. Crawl internal links from sitemap pages and record or fix any broken internal links. 5. Record audit evidence in Backlog, mark the task done if all acceptance criteria pass, then commit and push the task update.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Production audit completed on 2026-05-16 against maksimivanov.com after direct Pages DNS and Worker cleanup. Refreshed https://maksimivanov.com/sitemap.xml from production and found 95 URLs, including project pages. Checked every sitemap URL with curl -L; all 95 returned HTTP 200. Confirmed latest Cloudflare Pages production deployment source was 54014df, deployment e37bb27a-0f7e-4aef-a1bd-5bf0acccafbf, before the final audit checks. Representative legacy redirects passed: /posts/7-skills-of-an-effective-developer and trailing slash variant both 301 to /posts/skills-of-an-effective-developer/; /rss 301 to /rss.xml; /posts 301 to /posts/; /categories/javascript 301 to /categories/javascript/; /category/javascript/ 301 to /categories/javascript/; /category/uncategorized/ 301 to /posts/; /articles and /books 301 to their trailing-slash URLs; selected old root URLs redirect to their expected targets. Feed checks passed: /feed and /rss.xml return application/rss+xml and parse as XML with 72 items; /atom.xml returns application/atom+xml and parses as XML with 72 entries; /feed.json returns application/feed+json and parses as JSON with 72 items. Sample post assets passed: checked 10 representative PNG/JPEG/GIF/JPG files across recovered posts and each returned HTTP 200 with an image content type. Internal link crawl passed: crawled all 95 sitemap pages, extracted 181 unique same-site internal links, followed redirects, and found 0 broken internal links. No new Backlog task was needed for broken links.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Recovered production URLs and feeds are audited clean. All 95 sitemap URLs returned 200; representative legacy redirects, feed endpoints, and sample post image assets passed; and the internal link crawl found 0 broken same-site links.
<!-- SECTION:FINAL_SUMMARY:END -->
