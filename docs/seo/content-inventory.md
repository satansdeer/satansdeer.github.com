# Content Inventory

Last updated: 2026-05-16.

## Existing Text Archive

The recovered archive currently contains 72 posts.

Latest recovered text post:

- July 24, 2019: `react-console-snake-game-tutorial` - Command Line Applications Using React - Snake Game Tutorial

Category coverage:

| Category | Posts |
| --- | ---: |
| React | 30 |
| Javascript | 14 |
| Git | 5 |
| Ethereum | 5 |
| HTML | 4 |
| Programming | 4 |
| Random | 3 |
| ReactNative | 3 |
| Graphql | 1 |
| Markdown | 1 |
| Typescript | 1 |
| VSCode | 1 |

Immediate implication: React has the deepest archive and is likely the easiest cluster to defend or expand. Git has fewer existing posts but stronger product fit because of the Command Line Git book.

## Recent YouTube Candidates

Source: YouTube RSS feed for `satansdeer1`.

The public feed currently exposes these videos after the last recovered text post:

| Published | Title | Video |
| --- | --- | --- |
| 2026-05-15 | 15 May 2026 | https://www.youtube.com/watch?v=6bZQpVi6ZKY |
| 2026-05-14 | 14 May 2026 | https://www.youtube.com/watch?v=2nz_XJplNWU |
| 2026-05-13 | 13 May 2026 | https://www.youtube.com/watch?v=ko6Vi-X5Jog |
| 2026-05-12 | 12 May 2026 | https://www.youtube.com/watch?v=K2ZhVxn9aZ4 |
| 2026-05-11 | 11 May 2026 | https://www.youtube.com/watch?v=d_lMInP96Ho |
| 2026-05-10 | 10 May 2026 | https://www.youtube.com/watch?v=VASjljSo7Ow |
| 2026-05-09 | 9 May 2026 | https://www.youtube.com/watch?v=jsvp1Z-n_4k |
| 2026-05-08 | 8 May 2026 | https://www.youtube.com/watch?v=LWiGANQ-W8A |
| 2026-05-07 | 7 May 2026 | https://www.youtube.com/watch?v=33bO4xKuafQ |
| 2026-05-06 | 6 May 2026 | https://www.youtube.com/watch?v=xGL46oYQZoo |
| 2026-05-05 | 5 May 2026 | https://www.youtube.com/watch?v=juTat7qF43Q |
| 2026-05-04 | We all need to touch grass sometimes | https://www.youtube.com/watch?v=eV_fgBxQgc0 |
| 2026-05-03 | 3 May 2026 | https://www.youtube.com/watch?v=glIBoupQJHM |
| 2026-05-02 | 2 May 2026 | https://www.youtube.com/watch?v=KSu19Ewn0SQ |
| 2026-05-01 | 1 May 2026 | https://www.youtube.com/watch?v=mNfEigGQ35o |

The RSS titles are mostly date-based, so video-derived posts should start with transcript/topic extraction before keyword mapping. Do not publish raw transcripts; turn each video into a standalone article with examples, headings, internal links, and an embedded video.

## Git Book Repurposing

Source repository: `satansdeer/using-git-from-command-line-everything-you-need-to-know-to-get-started`.

Status: unblocked for chapter-based adaptation. Search Console prioritization is still pending while the property processes data.

Repurposing rule:

- Use chapters as source material, not direct copies.
- Create narrower posts with fresh examples and exercises.
- Link back to `/projects/command-line-git/` and `/books/command-line-git-everything-you-need-to-know-to-get-started/`.

Initial post formats to extract from the book:

- Concept explainer: one Git concept, one mental model, one concrete workflow.
- Exercise post: one command family with 3-5 exercises and answers.
- Troubleshooting post: one common failure mode and recovery path.
- Comparison post: two similar Git commands and when to use each.

Initial chapter-to-post queue:

- `book/10-adding-files-to-the-staging-area.md` -> `git-staging-area-explained` - concept explainer with exercises. Status: published locally.
- `book/11-commiting-changes.md` -> `what-is-a-git-commit` - explain commits, hashes, parents, and amend.
- `book/13-viewing-commit-history.md` -> `git-log-for-beginners` - practical history inspection workflow.
- `book/16-resetting-working-directory.md` + `book/17-undoing-changes.md` -> `undo-changes-in-git` - troubleshooting post.
- `book/19-resolving-merge-conflicts.md` -> `resolve-git-merge-conflicts` - exercise-heavy guide.
- `book/21-using-remote-repositories.md` -> `git-remote-origin-push-pull` - remotes and collaboration explainer.
