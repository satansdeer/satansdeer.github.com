---
title: Claude Code Architecture: How to Keep AI-Generated Code Maintainable
date: 2026-05-16T14:30:00.000Z
categories: Programming
image: contact-sheet.jpg
---

Claude Code is fast at producing code, but it is not your architect.

That distinction matters. If you let an AI coding tool decide every boundary for you, the first version can feel incredible and the second version can feel expensive. The codebase grows quickly, but the shape of the system may not improve with it.

This post is adapted from [a short video on TikTok](https://www.tiktok.com/@webdevivanov/video/7631569099822320918) and [the matching YouTube post](https://www.youtube.com/watch?v=dLWm8YB5FB0). The video point was simple: speed without architecture is not speed. It is debt with a good first impression.

![Contact sheet from the Claude Code architecture video](./contact-sheet.jpg)

## The Fast Part Is Real

AI coding tools are genuinely useful.

They can create a prototype in a day, fill in a feature before lunch, and write boilerplate faster than most developers can read it. That is not a small advantage. Used well, Claude Code can remove a lot of mechanical work from programming.

The trap is assuming that faster code output means faster product development.

Those are different things.

Product development includes changing the system later. It includes understanding the code after the first pass. It includes fixing bugs without touching five unrelated files. It includes asking another developer, or your future self, to reason about what should happen next.

That is where architecture starts to matter.

## Where The Slowdown Starts

The slowdown usually does not appear on the first prompt.

At first, Claude Code writes the missing function, adds the component, updates the route, and wires the state together. Everything moves.

Then you ask for a small change.

The tool adds a condition on top of another condition. Then a special case. Then a helper that knows a little too much about a different part of the app. Then a second helper that almost duplicates the first one, but not quite.

Now you are not slow because too little code exists. You are slow because too much code exists in the wrong shape.

The AI did what you asked. The missing part was the architectural constraint.

## Architecture Is About Boundaries

Architecture is not about making a project look fancy.

For day-to-day development, the core question is:

> What should know about what?

That question decides whether the code stays easy to change.

A UI component should not know how billing rules are calculated. A data access function should not know which button opened a modal. A validation helper should not secretly depend on a global state shape that only exists in one screen.

Claude Code is good at filling gaps once the boundary is clear. It is much weaker at deciding that the boundary should exist in the first place.

That is your job.

## Give Claude Code A Shape Before A Task

Before asking Claude Code to implement a feature, write the boundary in plain language.

If the codebase is already too large to explain from memory, pause here and map it first. I wrote a practical follow-up for that workflow: [Map Your AI-Generated Codebase Before You Rewrite It](/posts/map-ai-generated-codebase-architecture/).

For example:

```text
Add password reset.

Keep email delivery inside lib/email.
Keep token generation inside lib/auth/password-reset.
The React page can call the server action, but it must not import token helpers directly.
Do not add database access to UI components.
Add tests around token expiry and invalid token handling.
```

This kind of prompt is not longer for the sake of being longer. It gives the model a map of the system.

You are telling it where code is allowed to go, where it is not allowed to go, and which behavior must be protected by tests.

## Ask For The Patch In Smaller Units

Large AI-generated patches are hard to review.

Instead of asking for an entire feature in one prompt, split the work by boundary:

```text
First implement the password reset token module only.
Do not touch UI files yet.
Include unit tests for create, validate, expiry, and reuse.
```

Then:

```text
Now add the server action that uses the token module.
Do not change the token module unless the tests show a real gap.
```

Then:

```text
Now wire the form to the server action.
The UI should only know about form fields, loading state, and success/error messages.
```

This makes the review smaller and keeps the model from smearing responsibilities across the codebase.

## Review Dependency Direction

After the patch, do not only ask whether the app works.

Ask whether the dependencies point in the right direction.

Useful review questions:

- Did UI code import lower-level helpers directly?
- Did a shared utility gain product-specific knowledge?
- Did the model duplicate an existing abstraction instead of using it?
- Did tests cover the boundary, or only the happy path?
- Could this feature be removed without breaking unrelated features?

This is the same kind of thinking behind posts like [The Open-Closed Principle](https://maksimivanov.com/posts/open-closed-principle/) and [Do Not Mock What You Do Not Own](https://maksimivanov.com/posts/dont-mock-what-you-dont-own/). The details differ, but the theme is the same: code gets easier to work with when responsibilities are explicit.

## A Better Claude Code Prompt Template

Use this as a starting point:

```text
Implement [feature].

Existing boundaries:
- [module A] owns [responsibility].
- [module B] owns [responsibility].
- [UI area] can call [API/action], but must not import [lower-level module].

Constraints:
- Keep the patch limited to [files/directories].
- Reuse existing helpers before adding new ones.
- Add tests for [important behavior].
- If a boundary is unclear, stop and explain the options before editing.

After implementation, summarize:
- Files changed.
- Boundaries preserved.
- Tests added.
- Any architecture tradeoffs.
```

The most important line is the last constraint: if a boundary is unclear, stop and explain the options before editing.

That keeps the tool from guessing its way into architecture.

## Exercise

Pick one feature you recently asked an AI coding tool to build.

Before prompting again, write:

- The module that should own the business rule.
- The module that should own persistence.
- The UI surface that should call into the feature.
- One dependency that should not be introduced.
- One test that proves the boundary works.

Then give Claude Code that shape first, and only then ask for the implementation.
