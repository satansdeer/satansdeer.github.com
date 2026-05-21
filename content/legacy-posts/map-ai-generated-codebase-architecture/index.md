---
title: Map Your AI-Generated Codebase Before You Rewrite It
date: 2026-05-16T16:15:00.000Z
categories: Programming
image: codebase-map-contact-sheet.jpg
---

If you are using Claude Code, Cursor, or another AI coding tool to build an app quickly, make a map of the codebase before you start rewriting pieces of it.

AI tools can move fast enough that the codebase becomes hard to understand before you feel the slowdown. A diagram gives you a way to stop guessing. It shows what exists, what depends on what, and which parts are doing too much.

This post combines two short videos: [the codebase mapping clip](https://www.tiktok.com/@webdevivanov/video/7631897804771757334) and [the UML red-flags clip](https://www.tiktok.com/@webdevivanov/video/7631927253911309590). It is a follow-up to [Claude Code Architecture: How to Keep AI-Generated Code Maintainable](/posts/claude-code-architecture/).

![Contact sheet from the codebase mapping video](./codebase-map-contact-sheet.jpg)

## The Short Answer

Before asking an AI coding tool to refactor your app, ask it to inspect the codebase and produce a diagram of the current architecture.

Then, for each part of the diagram, ask:

- What is this part's responsibility?
- What are its inputs?
- What are its outputs?
- What does it depend on?
- What depends on it?

If you cannot explain the whole map in plain language, do not start a rewrite yet. First identify the confusing boundaries.

## Why This Matters

When you are "vibe coding" an application, the first version can arrive very quickly.

That speed hides a problem: the app can grow faster than your mental model of it. You keep adding features, the AI keeps editing files, and eventually you are no longer sure which module owns which responsibility.

That is the moment where random refactoring becomes expensive.

A codebase map gives you an intermediate step. It turns "this project feels messy" into something visible:

- a module with too many responsibilities,
- a dependency that points in the wrong direction,
- a UI file that knows too much about persistence,
- duplicated logic across similar helpers,
- an unclear boundary between product logic and infrastructure.

The map is not the solution. The map tells you where to look.

## Step 1: Ask For A Codebase Map

Start with a read-only exploration prompt.

```text
Explore this codebase without editing files.

Return a high-level architecture diagram.
Show the main modules, their responsibilities, and the dependencies between them.
Use Mermaid syntax if possible.
After the diagram, list any areas where ownership is unclear.
```

If your tool supports subagents, ask it to use them for exploration. The important part is that the first pass should inspect and explain, not rewrite.

For a JavaScript or Next.js app, you can ask it to pay attention to:

- pages or routes,
- server actions or API routes,
- data access,
- external services,
- state management,
- shared UI components,
- background jobs,
- configuration and secrets.

This gives you the first version of the map.

## Step 2: Annotate Every Box

A diagram with unlabeled boxes is not enough.

For each part, ask:

```text
For every node in the diagram, describe:
- responsibility,
- inputs,
- outputs,
- direct dependencies,
- callers,
- data it owns,
- data it should not own.
```

This is where architecture becomes practical.

You are not looking for fancy terminology. You are trying to answer a simple question: "what should know about what?"

If the answer is unclear, that is a signal. If the tool needs five paragraphs to explain one module, that is another signal. If a module has many unrelated inputs and outputs, it may be doing too much.

## Step 3: Look For Red Flags

![Contact sheet from the UML red-flags video](./uml-red-flags-contact-sheet.jpg)

Once the map exists, look for these problems.

### One Giant Module

If one box owns authentication, billing, UI state, persistence, analytics, and third-party API calls, it is not a module. It is a pile.

Do not start by splitting it randomly. First write down the responsibilities inside it.

### Too Many Arrows

If everything depends on everything else, small changes will keep producing surprising breakage.

Look for dependencies that cross layers. UI should not know low-level persistence details. Shared utilities should not know product-specific workflows.

### Unclear Inputs And Outputs

A healthy module is easier to describe:

```text
Input: user id and form values.
Output: validation result and saved profile.
```

An unhealthy module often sounds like:

```text
It gets some state, maybe updates the database, calls the API sometimes, and also changes the UI.
```

That strain of explanation is the point. When the explanation is hard, maintenance will be hard too.

### Duplicate Almost-Modules

AI tools often create similar helpers because they are optimizing for the current request.

The map can reveal two modules that should be one concept, or one module that should be split into two concepts.

## Step 4: Turn The Map Into A Refactor Queue

Do not ask the AI to "fix the architecture" in one pass.

Turn the map into small tasks:

```text
Based on this architecture map, list the top five boundary problems.
For each one, explain:
- why it is a problem,
- the smallest safe refactor,
- files likely affected,
- tests that should exist before editing.
```

Then pick one.

Good first refactors are usually small boundary improvements:

- move API client code out of UI components,
- move validation into a dedicated module,
- separate persistence from formatting,
- replace duplicated helpers with one shared helper,
- add tests around an unstable boundary before changing it.

The goal is not to make the diagram beautiful. The goal is to make the next change easier.

## A Useful Prompt Template

Use this when you are about to work on an AI-generated codebase:

```text
Do not edit files yet.

Explore the codebase and create a Mermaid architecture diagram.
Include the main modules, their responsibilities, and dependencies.

For every module, list:
- responsibility,
- inputs,
- outputs,
- direct dependencies,
- callers.

Then identify:
- modules with too many responsibilities,
- dependencies that point in the wrong direction,
- duplicated concepts,
- missing tests around risky boundaries.

End with a ranked refactor queue.
Each item should be small enough to review in one pull request.
```

After that, you can ask for one refactor at a time.

## Exercise

Pick one project that has been mostly built or heavily edited with AI coding tools.

Ask for the map. Then, without editing code, write down:

- the biggest module,
- the module with the most dependencies,
- one dependency that feels backwards,
- one responsibility that appears in more than one place,
- one boundary you want tests around before changing.

That list is more useful than a vague feeling that the project needs a rewrite.
