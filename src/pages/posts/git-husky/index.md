---
title: Automate Git With Hooks And Husky
date: 2019-05-01T01:58:45.284Z
categories: Git
image: thumb.jpg
---

`youtube:https://www.youtube.com/embed/qod6E738cc4`

Git provides an interface to run some code as reaction on specific triggers. Those triggers are called githooks (hooks used by git). You can run code on every commit, push, pull or other actions.

> Hooks are programs you can place in a hooks directory to trigger actions at certain points in git’s execution.

You can check out the whole list on [git documentation page](https://git-scm.com/docs/githooks).

It might be quite cumbersome to manage githooks and make them available for the whole team.

Luckily there is a tool called [Husky](https://github.com/typicode/husky) that provides nice interface to manage githooks.

It is an **npm** package so it's usually used with Javascript projects.

## Install Husky

To start using [Husky](https://github.com/typicode/husky) you need to install it as def dependency first:

```sh
npm install husky --save-dev
```

Then you need to add husky configuration section to `package.json`:

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-push": "npm test",
    }
  }
}
```

In this config specify that we want to run `npm test` before every `push` to remote repo.

Alternatively you can specify your settings in `.huskyrc`, `.huskyrc.json` or `.huskyrc.js` file

```json
// .huskyrc
{
  "hooks": {
    "pre-commit": "npm test"
  }
}
```

## Supported Hooks

Husky supports all Git hooks except server side hooks (`pre-receive`, `update` and `post-receive`).

* `applypatch-msg` - This hook is invoked by `git-am`. It takes a single parameter, the name of the file that holds the proposed commit log message. Exiting with a non-zero status causes git am to abort before applying the patch.

* `pre-applypatch` - This hook is invoked by `git-am`. It takes no parameter, and is invoked after the patch is applied, but before a commit is made.

* `post-applypatch` - This hook is invoked by `git-am`. It takes no parameter, and is invoked after the patch is applied and a commit is made.

* `pre-commit` - This hook is invoked by `git-commit`, and can be bypassed with the `--no-verify` option. It takes no parameters, and is invoked before obtaining the proposed commit log message and making a commit. 

* `prepare-commit-msg` - This hook is invoked by `git-commit` right after preparing the default log message, and before the editor is started.

* `commit-msg` - This hook is invoked by `git-commit` and `git-merge`, and can be bypassed with the `--no-verify` option. It takes a single parameter, the name of the file that holds the proposed commit log message. 

* `post-commit` - This hook is invoked by `git-commit`. It takes no parameters, and is invoked after a commit is made.

* `pre-rebase` - This hook is called by `git-rebase` and can be used to prevent a branch from getting rebased.

* `post-checkout` - This hook is invoked when a `git-checkout` is run after having updated the worktree.

* `post-merge` - This hook is invoked by git-merge, which happens when a git pull is done on a local repository. 

* `pre-push` - This hook is called by `git-push` and can be used to prevent a push from taking place.

* `pre-auto-gc` This hook is invoked by `git gc --auto`. 

    `git-gc` runs a number of housekeeping tasks within the current repository, such as compressing file revisions (to reduce disk space and increase performance), removing unreachable objects which may have been created from prior invocations of git add, packing refs, pruning reflog, rerere metadata or stale working trees.  

* `post-rewrite` - This hook is invoked by commands that rewrite commits (`git-commit` when called with `--amend` and `git-rebase`.

There are other less popular hooks, you can check them in [git documentation](https://git-scm.com/docs/githooks)

## Access Git params and stdin

Git hooks can access parameters via command-line arguments and stdin.

Husky makes them accessible via `HUSKY_GIT_PARAMS` and `HUSKY_GIT_STDIN` environment variables.

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "echo $HUSKY_GIT_PARAMS"
    }
  }
}
```

## Using In Monorepos

If you have a multi-package repository, it's recommended to use tools like [lerna] and have husky installed **ONLY** in the root `package.json` to act as the source of truth.

## Running Multiple Commands

By design, husky will run hook scripts as a single command. Just like scripts defined in `package.json` are run.

```json
{
  "pre-commit": "cmd && cmd && cmd"
}
```