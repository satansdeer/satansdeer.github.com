---
title: How To Add Named Anchor In Markdown
date: 2019-03-10T01:56:45.284Z
categories: Markdown
image: image.jpg
---

Sometimes you might want to have a link to an item inside your markdown document. It can pe especially useful when you create table of contents for your document.

The most common way to do this is to provide a named anchor for the section you want to link to. For example let's say you can add anchor to your section header:

```md
<a name="section-header"></a>
## Section Header
```

You can also put this anchor inside your header:

```md
## <a name="section-header"></a> Section Header
```

## Github Markdown

Github automatically generates names for headers.

For example for `# Header Title` Github will generate the following code:

```html
<h1><a id="user-content-header-title" class="anchor" aria-hidden="true" href="#header-title">Header Title</a></h1>
```

So you'll be able to reference that header using following link:

```html
<a href="user-content-header-title">Go to header title</a>
```