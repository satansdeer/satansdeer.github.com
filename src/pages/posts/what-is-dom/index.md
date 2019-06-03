---
title: What Is DOM
date: 2019-06-03T04:58:45.284Z
categories: HTML
image: virtual_dom.jpg
---

DOM (Document Object Model) is a programming api for your HTML (or XML) documents. Basically it is an object representing parsed code of your page.

It has tree-like structure and allows you to traverse, access and modify its nodes.

You are probably familiar with DOM API methods:

```js
document.getElementById(id)
document.getElementsByTagName(name)
document.createElement(name)
parentNode.appendChild(node)

// ... etc.
```

## Why Updating DOM Is Expensive

When you update DOM it can cause browser to run two expensive operations: **reflow** and **repaint**.

**Reflow** happens where there is a change to DOM layout. It calculates dimensions and positions of page elements. And it does it for every element and it's children.

**Repaint** goes through elements and determines visual changes (opacity, color, outline, visibility) and then updates pixels on the screen.

> Because of how updating DOM is expensive - React is using technique called [Virtual DOM](https://maksimivanov.com/posts/virtual-dom/).