---
title: React Concept - Virtual DOM
date: 2019-03-08T04:58:45.284Z
categories: React
image: virtual_dom.jpg
---

Unlike many other frameworks - React doesn't update DOM directly on every change and uses VirtualDOM to to optimize re-renders.

## What Is DOM

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

## What Is Virtual DOM?

Virtual DOM is an in-memory representation of Real DOM.

It is a lightweight Javascript object, and ReactJS uses different optimizations to make updating it cheap and fast.

## How Does Virtual DOM Help?

When state or props of your components change - React generates new Virtual DOM tree.

Then react runs the diffing algorithm to calculate what changes should be applied to real DOM. This process is know as reconsiliation.

React batches changes whenever possible to minimize amount of times browser has to do **reflow** and **repaint**.

Finally React updates the real DOM.

## Conclusion

So Virtual DOM is a pattern that React uses to optimize rendering by reducing the amount of expensive **reflow** and **repaint** operations.