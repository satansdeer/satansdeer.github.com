---
layout: post
title:  "Add Specific Lines With Git Patch"
date:   2017-09-22 22:58:45 +0300
categories: git
image: git_patch_thumb.jpg
---

You know that `git add` adds files to index. But did do you know that it can add __specific&nbsp;lines__ of files? Or even add files, ignoring their contents? Let's check this out!

First let's get familiar with `git add --patch` command or it's shorthand `git add -p`. What does it do?

Let's imagine that you've been working on some task. During the process you've got carried away and introduced some changes not related to your current task.

Now it's time to commit the changes, but some of them are irrelevant. It would be wrong to put everything in that commit.

This is where `git add --patch` comes into play.

## See The Example

Imagine we had a file _poem.txt_ with two unfinished couplets:

```bash
Roses are red
Violets are blue

Roses are red
Violets are blue
```

After a full day of dedicated hard work we've completed both:

```diff
➜  git_add_patch (master) ✗ git diff

diff --git a/poem.txt b/poem.txt
index 39f13e6..f4b70ab 100644
--- a/poem.txt
+++ b/poem.txt
@@ -1,5 +1,9 @@
 Roses are red
 Violets are blue
+Sugar is sweet
+And so are you

 Roses are red
 Violets are blue
+Onions stink
+And so do you.
```

But now we are a bit concerned about the second couplet and want to commit only the first part.

```diff
➜  git_add_patch (master) ✗ git add -p

diff --git a/poem.txt b/poem.txt
index 39f13e6..f4b70ab 100644
--- a/poem.txt
+++ b/poem.txt
@@ -1,5 +1,9 @@
 Roses are red
 Violets are blue
+Sugar is sweet
+And so are you

 Roses are red
 Violets are blue
+Onions stink.
+And so do you.
Stage this hunk [y,n,q,a,d,/,s,e,?]?
```

See the last line, __Stage this hunk [y,n,q,a,d,/,s,e,?]__? Here it gives you some options where the most important are:

* __y__ - stage this hunk
* __n__ - do not stage this hunk
* __q__ - quit; do not stage this hunk or any of the remaining ones
* __a__ - stage this hunk and all later hunks in the file
* __d__ - do not stage this hunk or any of the later hunks in the file
* __s__ - split the current hunk into smaller hunks
* __e__ - manually edit the current hunk

There are some more opions, you can see them by chosing the __?__ option.

Here we want only the first part about the sugar and sweetness, so we choose the option&nbsp;__s__.

```diff
Stage this hunk [y,n,q,a,d,/,s,e,?]? s
Split into 2 hunks.
@@ -1,5 +1,7 @@
 Roses are red
 Violets are blue
+Sugar is sweet
+And so are you

 Roses are red
 Violets are blue
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]? y
```

We chose to stage that hunk, and now it asks if we want to stage the second one:

```diff
Stage this hunk [y,n,q,a,d,/,j,J,g,e,?]? y
@@ -3,3 +5,5 @@

 Roses are red
 Violets are blue
+Onions stink
+And so do you.
Stage this hunk [y,n,q,a,d,/,K,g,e,?]? n
```

And we don't want to stage this one, so we choose __n__.

Great, let's see what we have now.

```bash
➜  git_add_patch (master) ✗ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   poem.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   poem.txt
```

Cool beans, time to commit this thing.

```bash
➜  git_add_patch (master) ✗ git commit -m "Complete the first couplet"
```

Git splits hunks by the empty lines, but what if you really need to stage only __specific&nbsp;lines__.

## Behold The Power Of E

Imagine you have a `diff` like this:

```diff
➜  git_add_patch (master) ✗ git diff

diff --git a/poem.txt b/poem.txt
index 9737e9f..a2baecd 100644
--- a/poem.txt
+++ b/poem.txt
@@ -5,3 +5,6 @@ And so are you

 Roses are red
 Violets are blue
+Flowers smell good
+Onions stink
+And so do you.
```

And you are really concerned about that onion part, but you don't want to remove it. So you want to stage only the _"Flowers smell good"_ and _"And so do you"_ lines.

Now the __s__ option won't help us, because those lines aren't separated by empty lines, and git considers them as one hunk.

__e__ option to the rescue.

```bash
➜  git_add_patch (master) ✗ git add -p
diff --git a/poem.txt b/poem.txt
index 9737e9f..a2baecd 100644
--- a/poem.txt
+++ b/poem.txt
@@ -5,3 +5,6 @@ And so are you

 Roses are red
 Violets are blue
+Flowers smell good.
+Onions stink.
+And so do you.
Stage this hunk [y,n,q,a,d,/,e,?]? e
```

It will open the default text editor and you'll be able to manually edit that hunk.

![editor](/assets/images/edit_hunk.png)

Just remove the part about onions and here you go:

```diff
➜  git_add_patch (master) ✗ git add --staged

diff --git a/poem.txt b/poem.txt
index 9737e9f..a2baecd 100644
--- a/poem.txt
+++ b/poem.txt
@@ -5,3 +5,6 @@ And so are you

 Roses are red
 Violets are blue
+Flowers smell good
+And so do you.
```

Nice, now you can decide what to do about those stinky onions later.

But what if you need to add some specific lines from the new file?

## Use The Intent To Add

Use `git add --intent-to-add` or `git add -N` to add specific file, but not its contents.

Imagine that we had our poem written from scratch.

Now `git diff` shows nothing, and if we'll use `git add -p` it will say `No changes.`

No problem, let's tell git that the file exists.

```bash
➜  git_add_patch (master) ✗ git add -N poem.txt
```

Now we can use `git add -p` and then edit the hunk to remove the lines about onions.
