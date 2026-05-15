---
title: Git Stash
date: 2018-07-12T22:58:45.284Z
categories: Git 
image: git-stash.jpg
comments: true
---

Sometimes you have uncommited changes and you need to switch to another branch. Here is where `git stash` is very handy.

## Basic Usage

`youtube:https://www.youtube.com/embed/7aVmVbpEdjc`

When switching between tasks you sometimes have uncommited work. In this case you can temporarily save changes in git without commiting them. Here's how it looks.

First make sure your changes are staged (use `git add`). Git stash can only be applied to **staged** changes.

```bash
$> git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   script.js
        new file:   stylesheet.css
        new file:   webpage.html
```

OK, here we have 3 new files that we don't want to commit yet, but we need to switch to another branch.

So we use `git stash` and after applying this command we see a message indicating that changes are stashed successfully.

```bash
Saved working directory and index state WIP on master: bccdab5 Initial commit
```

If you check the repo with `git status` now you'll see that there is no uncommited changes.

After switching to another branch and fixing the bug you can get back to your original branch and apply stashed changes using `git stash apply`.
