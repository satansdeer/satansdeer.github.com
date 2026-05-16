---
title: Where To Store API Keys: Stop Putting Secrets in .env Files
date: 2026-05-16T16:05:00.000Z
categories: Programming
image: contact-sheet.jpg
---

Do not treat `.env` files as your long-term secret storage.

A local `.env` file can be a convenient development input when it is ignored by Git and only exists on your machine. The mistake is using `.env` as the place where real, long-lived API keys live across your app, your CI pipeline, your teammates' machines, and production.

That is not secret management. That is a text file waiting to be copied, committed, pasted into a chat, included in a crash report, or leaked through a build.

This post is adapted from [a short TikTok video](https://www.tiktok.com/@webdevivanov/video/7634553095103581462) and [the matching YouTube video](https://www.youtube.com/watch?v=bZwOlUq7JDM) about a mistake that is especially easy to make when you are moving fast with AI coding tools.

![Contact sheet from the source video](./contact-sheet.jpg)

## The Short Answer

Store API keys in a secret manager or in the secrets system provided by your deployment platform, CI provider, or cloud provider.

Use `.env` only as a local development convenience, and never commit it. In production, your app should receive secrets from controlled infrastructure, not from a file copied around by hand.

The basic rule:

```text
Local development: .env can be acceptable if it is ignored and contains disposable local values.
Shared or production secrets: use a secret manager.
Front-end code: never receive private secrets.
```

## Why `.env` Files Become Dangerous

A `.env` file feels harmless because it is simple.

You add:

```text
PAYMENT_API_KEY=sk_live_...
DATABASE_URL=postgres://...
OPENAI_API_KEY=...
```

Then the app works.

The problem is not that the file format exists. The problem is the workflow that grows around it.

People start copying the file between machines. Someone asks for it in Slack. A deployment script uploads it. A debugging session prints it. A new AI coding session reads the project and treats the file as normal app context. Eventually, the file is no longer a local-only implementation detail. It becomes the secret distribution system.

That is the part you want to avoid.

## The Front End Must Not Have Private Secrets

If a secret reaches browser JavaScript, it is not a secret anymore.

Anything shipped to the browser can be inspected by users. That includes bundled code, source maps, network requests, local storage, page HTML, and environment variables that were embedded at build time.

This is the first check:

```text
Does this key allow private access, billing, writes, admin operations, or user data access?
```

If the answer is yes, it belongs on the server side.

For example, this is the wrong direction:

```js
// Browser code: wrong for private keys
const apiKey = process.env.PAYMENT_SECRET_KEY;
```

The browser should call your server. Your server should use the secret.

```js
// Browser code
await fetch("/api/create-checkout-session", {
  method: "POST",
});
```

```js
// Server code
const paymentKey = process.env.PAYMENT_SECRET_KEY;
```

Even then, production should inject that value from a controlled secret store, not from a manually shared `.env` file.

## What To Use Instead

Use a secret manager that supports programmatic access.

The exact tool depends on where the app runs, but the shape is usually the same:

- Store the secret in the platform's secret store.
- Grant access only to the service that needs it.
- Inject the secret at runtime or deploy time.
- Rotate the secret when access changes or a leak is suspected.
- Audit who and what can read it.

Common places where secrets should live:

- Your hosting platform's environment/secret settings.
- Your CI provider's encrypted secrets.
- Your cloud provider's secret manager.
- A dedicated team secret manager with CLI or API access.

The important property is not the brand. The important property is that secrets are access-controlled, auditable, and not passed around as files.

## A Practical Migration Path

If you currently have secrets in `.env`, do this.

First, make sure the file is ignored:

```bash
printf ".env\n.env.*\n" >> .gitignore
git status
```

Do not blindly commit that change without checking it. If `.env` was already committed earlier, ignoring it now does not remove it from history.

Second, create a template file with fake values:

```text
# .env.example
DATABASE_URL=postgres://user:password@localhost:5432/app
PAYMENT_PUBLIC_KEY=replace-me
```

The template explains what the app needs without exposing real credentials.

Third, move real values into your deployment or secret manager.

Fourth, rotate anything that may have been exposed. If a real key was committed, pasted, logged, or shared, assume it is compromised.

## What About Local Development?

For local development, `.env` is still useful.

The safer version looks like this:

- `.env` exists only on your machine.
- `.env` is ignored by Git.
- `.env.example` is committed with fake values.
- Local secrets are low privilege where possible.
- Production secrets are never copied into local files unless there is a deliberate emergency reason.

This gives you convenience without turning the file into the source of truth.

## Common Mistakes

### Mistake 1: Committing `.env` Once

Deleting the file in a later commit does not erase the earlier commit. Rotate the keys.

### Mistake 2: Using Production Keys Locally

Local development should not need broad production access. Use separate keys, separate accounts, or lower privileges where the service supports it.

### Mistake 3: Hiding Secrets In Front-End Environment Variables

Build tools often expose selected environment variables to browser code. If it ends up in the bundle, users can read it.

### Mistake 4: Giving Every Service Every Secret

Each app, worker, and job should receive only the secrets it needs. This makes leaks smaller and rotation less painful.

## Exercise

Open one project and answer these questions:

- Is `.env` ignored by Git?
- Is there a committed `.env.example` with fake values?
- Are any production secrets stored in local files?
- Are any private keys used by browser code?
- Where would you rotate each key if it leaked?

If you cannot answer the last question quickly, secret management is part of your next cleanup task.

## Summary

`.env` files are fine as local development inputs. They are not a secret management system.

Keep private keys out of the browser, keep real secrets out of Git, and use a secret manager or platform secrets for shared and production values. If a real key has already leaked, rotate it instead of pretending deletion fixed the problem.
