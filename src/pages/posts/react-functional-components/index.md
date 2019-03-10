---
title: React Functional Components
date: 2019-03-10T02:09:45.284Z
categories: React
image: react_dev_tools.jpg
---

The simplest way to define a component in React is to use `function`.

To do it you just declare a function that receives `props` and returns some **JSX** layout.

Here is an example:

```js
const Header = (props) => <h1>{props.text}</h1>;
```

You can use object destructuring to get specific props:

```js
const Header = ({text}) => <h1>{text}</h1>;
```

## Why Use Functional Components

Overall functions is preferred way of writing components in react.

This is due to the fact that functions, especially if they are [pure](https://maksimivanov.com/posts/pure-functions-and-side-effects/) are easy to read, test and reason about.

If you have a component that doesn't have internal `state` and doesn't have event listeners defined, and doesn't rely on lifecycle methods - use functional component.

With release of **hooks** - it became possible to have state and perform side effects even in functional components.