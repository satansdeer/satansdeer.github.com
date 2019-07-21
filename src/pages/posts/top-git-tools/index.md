---
title: 5 Git Tools You Must Use Today
date: 2019-07-21T03:09:45.284Z
categories: Git 
image: react_dev_tools.jpg
---

In this article I'll list 5 git tools that you must use today.

## Hub

[Hub](https://hub.github.com/) is my favourite tool and I use it a lot. If you use GitHub to store your repositories - this tool will save you a ton of time.

It automates creating new repos, making new pull requests, forking repos and filing issues. 

There are a ton of other features and options - so definitely check it out.

## Husky

I already have a video on my channel about [Husky](https://github.com/typicode/husky), but I'll still mention it here.

If you need to run scripts locally before you commit or push your changes - this tool will cover you.

You can use it to run tests or lints before or after you commit push or pull changes to and from your repository.

Husky allows you to define git-hooks in a simple config file and share them across the team.

## Commitizen

Yesterday I've read a blog post where some dude said that he set up a simple script that simplifies making git commit for him, by automatically adding message "Update".

Honestly I think it's a very bad idea, and if you do this - eventually you'll have a hard time navigating though history to find some bug introduced awhile ago.

A better option is to use [Commitizen](http://commitizen.github.io/cz-cli/).

It's a command line tool that automatically formats commits for you using conventional commits convention.

### Conventional Commits

[This convention](https://www.conventionalcommits.org) describes commit message format. 

Simply the format is as follows: `type`, ` scope` that is optional, then `descripion` and then you can have more details in commit `body` and `footer`.

Besides making your commit history tidy and easy to read it also unlocks two neat features: semantic versioning and automatic changelog generation.

### Semantic Versioning

For those who don't know [semantic versioning ](https://semver.org) is a system of versioning your packages in a `MAJOR.MINOR.PATCH` form.

Where you bump `MAJOR` when you make incompatible API changes, `MINOR` - when you add backwards compatible features and `PATCH` - when you make backwards compatible bug-fixes.

The opposite of that is [sentimental versioning](http://sentimentalversioning.org/). Where you have whatever inconsistent rules you can come up with. And you don't even have stick to one schema with sentimental versioning you bumb your numbers however you feel like.

### Automatic changelog

Another neat feature of having you commits well organized and having descriptive messages - is that you'll now be able to generate your [changelog](https://keepachangelog.com/en/1.0.0/) automatically.

So you'll be able to track notable changes to your project at basically zero cost.

## CommitLint

If you don't want to have your commits automated, but still want to have them tidy and organized - use [CommitLint](https://commitlint.js.org/#/) instead.

CommitLint can be run manually or using git hooks, remember Husky. And it will check if your messages conform to chosen format.

## gitignore.io

And last tool I want to share is [gitignore.io](https://gitignore.io) that allows you to easily generate `.gitignore` fily for any type of project.

It will save you from forgetting to add sensitive files and folders to your project.

Also there is a collection of `.gitignore` files [on Github](https://github.com/github/gitignore). 

## Final

Thank you for reading this far. If you know any other great tools - drop me a message in my [Telegram](https://t.me/satansdeer)
