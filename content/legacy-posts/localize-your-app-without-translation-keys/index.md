---
title: Localize Your App Without Inventing Translation Keys For Every String
date: 2026-05-16T17:05:00.000Z
categories: Programming
image: contact-sheet.jpg
---

When an app grows past one language, the first instinct is usually to invent a translation key for every visible string.

That sounds organized. It often makes the system harder to maintain.

This post is adapted from [a YouTube video about app localization](https://www.youtube.com/watch?v=mNfEigGQ35o). The short version: for many product strings, the source text itself is a better key than a made-up name like `login_button_text`.

![Contact sheet from the localization video](./contact-sheet.jpg)

## The Problem With Naming Every String

Imagine you are localizing a sign-in screen.

The button says:

```text
Log in
```

A common i18n setup turns that into a named key:

```json
{
  "login_button_text": "Log in"
}
```

Then code renders the key:

```js
t("login_button_text")
```

For one button, this feels fine. For a real app, the names start multiplying:

```json
{
  "login_button_text": "Log in",
  "login_screen_title": "Welcome back",
  "login_error_invalid_password": "The password is incorrect",
  "login_error_rate_limited": "Too many attempts. Try again later."
}
```

The problem is not the JSON file. The problem is that many UI strings do not have stable names in the product. You end up naming copy that did not need a name in the first place.

Now every wording change becomes two decisions:

- What should the text say?
- Should the key name change too?

Most teams avoid the second question, so old key names stay forever. A key called `login_button_text` might eventually render "Continue", "Sign in", or "Use your account". The key stops documenting the product and becomes an arbitrary identifier.

## Use Source Text As The Key

Tools like GNU gettext take a different approach: the original text is the lookup key.

Instead of inventing a label, the code can say what it means:

```js
t("Log in")
```

The translation file maps that source text to each target language:

```json
{
  "Log in": "Iniciar sesion"
}
```

That looks almost too simple, but it has a useful property: when the English source text changes, the lookup changes too.

If you replace:

```text
Log in
```

with:

```text
Sign in
```

the translation should probably be reviewed. Not because translators cannot guess what happened, but because wording changes often carry nuance. A "Log in" button, a "Sign in" button, and a "Continue" button can imply different flows in different languages.

Source-text keys make that change visible.

## Why This Helps AI-Built Apps

AI-built apps tend to grow quickly.

That is useful, but it also means you can accumulate string keys before you have a stable product language. If every prompt adds five named strings, you can end up with a translation layer that reflects yesterday's component names more than today's product.

For early-stage apps, source-text keys keep the copy close to the interface.

They also make prompts simpler:

```text
Localize this React screen.
Use the English source string as the translation key.
Do not invent semantic key names unless the string is reused in multiple contexts.
```

That constraint prevents the model from generating a pile of vague names like `hero_title`, `button_text`, or `error_message_2`.

## When Named Keys Still Make Sense

Source-text keys are not always the right answer.

Named keys are useful when the same visible text has different meanings in different contexts. For example:

```text
Open
```

That could mean:

- Open a file.
- Open a support ticket.
- Open a store.
- A status is open.

If the translation depends on the context, a named key or explicit context field is better than pretending the source text alone is enough.

Named keys also help for strings that are assembled from structured product concepts, such as billing states, permission labels, or legal copy that needs stable review.

The rule is not "never name strings". The rule is: do not invent names for strings that are already clear in the source language.

## A Practical Rule

Use this default:

- Use source-text keys for ordinary UI copy.
- Add context when the same text can mean different things.
- Use named keys for stable product concepts, legal text, reusable templates, and state-machine labels.
- Treat a source text change as a signal to review the translation.

That gives you a localization system that stays close to the product instead of becoming a second naming system.

## Exercise

Open one screen in your app and list every visible string.

For each string, ask:

- Does this text need a stable product name?
- Could the English source text be the key?
- Would changing this text mean the translation should be reviewed?

If the answer is yes to the last two questions, a gettext-style source key is probably enough.

## Summary

Localization gets harder when you name every string too early.

For many UI strings, the text itself is the best key. It keeps the code readable, makes copy changes visible, and avoids a translation file full of names that no longer match the product.

If you are using AI coding tools, make that rule explicit in the prompt. The model will happily invent translation keys forever unless you give it a better constraint.
