---
title: Introduction To ReactJS
date: 2019-02-15T01:58:45.284Z
categories: React
image: intro_to_react.jpg
---

`youtube:https://www.youtube.com/embed/FleEIijoXtk`

An introduction to ReactJS for beginners.

## What Is ReactJS?

ReactJS is a Javascript Library for building User Interfaces. It was initially created by Jordan Walke in Facebook. First time it was used in 2011 to display the news feed.

It was then made public in 2013, and since then was used in thousands and thousands of different apps and websites, including Facebook, Instagram and even Battlefield game series.

## ReactJS Key Features

What makes React so special? The core idea behind ReactJS is to provide a convenient way to describe UI of your application as a tree of encapsulated **components**.

It does it by providing an API to describe those components in a **declarative** way. ReactJS will update UI of your application when state of your application will change. And it will do it efficiently so only components that were affected by that data change will be re-rendered.

Now you may see those terms and wonder, what does declarative mean, and what the heck is component.

### Declarative

**Declarative** is the opposite of **imperative**.

When you write **imperative** code you specify sequence of statements that should be executed in that order to produce desired result.

```js
var mountingPoint = document.querySelector("#root");
// Find mounting point

var header = document.createElement("h1");
// Create HTML node

header.innerHTML = "Hello Imperative Code!";
// Add content to the new element

// Insert the element after our target element
mountingPoint.appendChild(header);
```

Opposed to that when you write **declarative** code - you describe what result do you want to get instead of specifying the steps needed to achieve that result.

Here is how same thing would look in ReactJS:

```jsx
import React from "react";

export default () => <h1>Hello React Code</h1>;
```

Good analogy is HTML, as it is a **declarative** way to describe layout of web pages.

### Component Based

Second important concept is **component**. In fact it is the central part of ReactJS paradigm.

Basically it's an isolated piece of interface, that can contain some layout, some bound state and some logic. Component can be as simple as just a button or text input, or it can be complex and be composed from many other simpler components.

![react component structure](/react_component_structure.png)

Components can have children components inside of them, that can have their children and so on.

This allows you to describe your application UI as a nested tree of components.

![reactjs component tree](/component_tree.png)
