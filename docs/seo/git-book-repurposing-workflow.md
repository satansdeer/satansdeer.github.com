# Git Book Repurposing Workflow

Goal: adapt Command Line Git material into public blog posts without duplicating the book.

## Inputs

- Chapter source from `satansdeer/using-git-from-command-line-everything-you-need-to-know-to-get-started`.
- Target reader stage: beginner, early intermediate, or troubleshooting.
- One primary query from Search Console or keyword research.
- One exercise set.

## Adaptation Rules

- Do not copy chapter text directly.
- Narrow each post to one search intent.
- Use fresh examples and commands.
- Add exercises and expected outcomes.
- Link to the book project and book page.
- Keep the book as the deeper, more complete resource.

## Post Formats

### Concept Explainer

Use for durable basics.

Examples:

- What is a Git commit?
- What is a Git branch?
- How does the staging area work?

Structure:

```md
## Short Answer
## Mental Model
## Minimal Example
## Practice Exercise
## Common Confusion
## Summary
```

### Exercise Post

Use for command practice.

Examples:

- Git add exercises for beginners.
- Git branch exercises.
- Git merge conflict practice.

Structure:

```md
## Setup
## Exercise 1
## Exercise 2
## Exercise 3
## Answers
## What To Try Next
```

### Troubleshooting Post

Use for recovery intent.

Examples:

- Undo the last Git commit.
- Recover a deleted Git branch.
- Fix commits on the wrong branch.

Structure:

```md
## The Situation
## Safe First Step
## Fix Option 1
## Fix Option 2
## How To Verify
## What Not To Do
```

### Comparison Post

Use when queries compare commands.

Examples:

- `git switch` vs `git checkout`
- `git fetch` vs `git pull`
- `git reset` vs `git revert`

Structure:

```md
## Short Answer
## When To Use Each
## Examples
## Common Mistakes
## Exercise
```

## Internal Links

Every Git-derived post should link to:

- `/projects/command-line-git/`
- `/books/command-line-git-everything-you-need-to-know-to-get-started/`
- At least one related Git article.

## Publishing Checklist

- The post stands alone without the book.
- The example is different from the chapter example.
- Exercises are new or materially changed.
- Title targets a single query.
- The intro answers the query quickly.
- Book links are contextual, not sales-heavy.
- `npm run build` passes.

## First Batch

- `git-staging-area-explained`: adapted from the staging chapter as a beginner concept explainer with new examples and four exercises. Status: published.
- `what-is-a-git-commit`: adapted from the commit chapter around commit IDs, parents, merge commits, amend, and beginner exercises. Status: published.
- `git-log-for-beginners`: adapted from the history chapter into a command reference plus inspection workflow. Status: published.
- `undo-changes-in-git`: combine the reset and undo chapters into a recovery-focused article.
- `resolve-git-merge-conflicts`: adapt the merge-conflict chapter into a practice guide.
