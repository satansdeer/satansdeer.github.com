---
layout: post
title:  "Getting Schwifty With Pull Requests"
date:   2017-09-22 22:58:45 +0300
categories: git
image: test.jpg
---

Once I was working on a big feature. Everything was going fine until I got carried away and started to commit everything in one branch instead of splitting to multiple smaller ones. As a result I ended up with a huge PR that no one was able to review properly.

Let's see how can you avoid getting in that situation and what to do if you already did.

First of all – do some planning and break task in parts. This is the only way you'll be able to avoid creating this monstrosity of a pull request.

Then you'll have two options, with both of them you create small PR's with gradual improvements:

* Merging PR's to master early and often.
* Having a long running feature PR with small reviewable child PR's.

The difference is what you are basing them off. In first case you base them on `master` and in second you base them on a feature branch.

## Merging Early And Often

This is the __preferred option__. You better have a good plan of what you are going to do though. You don't want to end up creating meaningless pull requests with lonely components that don't interact with anything. Like models that no one uses.

Do it as incremental improvements. In your first PR set the base structure and then gradually improve it by adding more components and upgrading the old ones.

## Long Running Feature PR

You'll have to rebase the base branch with master and then rebase it's children as well.

This approach might require some cherry-picking between branches if you'll be working in parallel with someone else.

Don't forget to do the housekeeping and creating small PR's for every new feature or you are going to end up with…

## The Worst Case

It started as a long running feature PR approach. But then I kinda slacked off with the housekeeping and started to commit everything in one of the child PRs.

Eventually I ended up with a huge PR with 100+ commits and 1.5k lines of code.

This is a very bad situation. Even if someone would dare to review it, he'll be more likely to overlook something.

So if you found yourself in similar situation – you need to do something to this PR to make it reviewable. For example you can…

## Break It Into A Stack Of PRs

When searching for a solution I found [this blog-post](https://graysonkoonce.com/stacked-pull-requests-keeping-github-diffs-small/) of Grayson Koonce where a he proposed to close the original PR, copy it's changes to a new branch and then create a stack of dependent PRs with incremental changes one on top of another.

## First step

First you want to create a new branch based on `master` with all the changes from that huge PR unstaged.

```bash
$ git checkout master
$ git checkout -b stacked-pr-example-1 branch-of-that-huge-pr
$ git reset master
$ git status
```

Now you'll see all the changes that were introduced in that huge PR in uncommited state.
You can start commiting the changes and making stacked PRs.

## First Pull Request

You'll have to use `git add --patch` to add specific changes to a commit. I have a [post&nbsp;about&nbsp;this&nbsp;command](/posts/git-add-patch).

But if you have unstaged new files – git won't be able to add them this way. To fix it apply `git add -N` or `--intent-to-add` to a file you want to see in your commit. This will tell git to add file itself but not it contents. After that you will be able to add lines from that file easily.

At this point you might want to check how many changed lines you've already added. Use `git diff --staged --stat` for this.

Once you've staged all the needed changes, stash everything else and verify that it still works.

```bash
$ git stash --include-untracked --keep-index
```

`--keep-index` will make it stash only files that have not been added and `--include-untracked` will allow it to stash untracked files as well.

Time to commit the changes and create the PR.

```bash
$ git commit -m "Make some change to x"
$ git push -u origin stacked-pr-example-1
```

There is a nice CLI tool `hub` that will allow us to create a PRs easier:

```bash
$ hub pull-request
```

It will open the default editor and you'll be able to add PR descirption.

## Next Pull Requests

Now create the branch for your next PR and pop the stash back:

```bash
$ git checkout -b stacked-pr-example-2
$ git stash pop
```

Repeat the `add`, `stash`, `commit` steps.

Now create new PR, but make sure to base it off of the previous branch with the -b flag:

```bash
hub pull-request -b stacked-pr-example-1
```

Repeat the process until the changes are packed into PRs.

## After You've Got Your PRs Reviewed

Here Grayson gives an important tip to propagate additional commits via `git merge` instead of `git rebase`.
This way you'll be able to resolve conflicts in multiple commits in one go.

```bash
$ git checkout stacked-pr-example-2
$ git commit -am "Addressed this feedback"
$ git commit -am "Addressed that feedback"
$ git push stacked-pr-example-2

$ git checkout stacked-pr-example-3
$ git merge stacked-pr-example-2 # integrate changes from stacked-pr-example-2
```

Now, after you've applied all feedback and got you PRs approved – time to land the stack.

As github [supports updating the base branch](https://github.com/blog/2224-change-the-base-branch-of-a-pull-request) since August 2016, you can merge your stack in any order.
