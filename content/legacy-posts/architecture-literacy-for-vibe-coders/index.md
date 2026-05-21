---
title: Architecture Literacy For Vibe Coders
date: 2026-05-16T18:55:00.000Z
categories: Programming
image: contact-sheet.jpg
---

Architecture is not optional when you are building with AI coding tools.

You can get to an MVP with prompts and persistence. Moving past the MVP requires enough architectural literacy to understand what the system is becoming, where it is hard to reason about, and which parts are starting to fight back.

This post is adapted from [a YouTube video about architecture literacy for vibe coders](https://www.youtube.com/watch?v=9vMjt-6ow8s). It pairs well with [Claude Code Architecture: How to Keep AI-Generated Code Maintainable](/posts/claude-code-architecture/).

![Contact sheet from the architecture literacy video](./contact-sheet.jpg)

## The Short Answer

Architecture literacy means you can hold a compact model of the application in your head.

You do not need to memorize every file. You do need to understand:

- the main parts of the system,
- what each part owns,
- what depends on what,
- where data enters and leaves,
- which boundaries are clear,
- which boundaries are confusing.

If you cannot explain the current shape of the app, you cannot reliably improve it.

## Why Books Are Not Enough

Architecture books can be useful.

The problem is timing. When your app is already growing and an AI tool is editing files quickly, abstract architecture advice may not tell you what to do next.

You need to work with the architecture in front of you.

That means opening the project, mapping the system, and noticing where understanding becomes hard. The strain is signal.

If you have to read five files to understand one feature, something may be unclear. If the UI knows too much about persistence, a boundary may be leaking. If every change touches unrelated modules, the model is too tangled.

## Architecture Is A Compact Model

A useful architecture is not a fancy diagram.

It is a compact model of the app:

```text
This module owns authentication.
This module talks to the database.
This page calls this server action.
This service wraps the external API.
This queue handles background work.
```

That model should fit in your head well enough that you can move pieces around mentally before asking the AI to edit code.

When the model does not fit, your prompts get worse. You start asking for changes without knowing where they should land.

## Work With Your Own App First

Before asking which architecture book to read, ask your AI coding tool to map the project:

```text
Explore this app without editing files.
Return the main modules, their responsibilities, and dependencies.
Point out any files with unclear ownership.
```

Then read the result critically.

Do not accept the diagram as truth. Use it as a tool to ask better questions:

- Why does this component know about billing?
- Why does this helper call the database?
- Why are there two similar validation paths?
- Why is this module hard to describe?

Those questions build architectural literacy faster than abstract study alone.

## A Practical Test

Pick one feature and explain it in this format:

```text
Input:
Owner:
Main files:
Dependencies:
Output:
Tests:
```

For example:

```text
Input: email address
Owner: password reset module
Main files: lib/auth/password-reset, app/actions/reset-password
Dependencies: database, email provider
Output: reset token email
Tests: token expiry, invalid token, repeated request
```

If you cannot fill this out, the feature may not have a clear shape yet.

## Common Mistakes

Treating architecture as something senior developers do later.

Assuming the AI understands your system boundaries better than you do.

Waiting until the codebase is painful before mapping it. By then, every change is already harder.

## Exercise

Ask your AI coding tool to create a module map of your current project.

Then find:

- one module that is easy to explain,
- one module that is hard to explain,
- one dependency that feels backwards,
- one place where tests would protect a boundary.

That list is your starting architecture lesson.
