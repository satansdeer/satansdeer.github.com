---
title: Starting With JSX
date: 2019-02-17T01:58:45.284Z
categories: react
image: starting_with_jsx.jpg
---

JSX is a syntax used in React applications to describe the layout of your components.

## Introduction to JSX

Even though it is possible to use ReactJS without JSX - using it makes working with ReactJS components a lot easier.

Look at these examples:

*With JSX:*
```jsx
const element = <h1>Hello React!</h1>
```

<br/>

*Without JSX:*
```jsx
const element = React.createElement(
  'h1',
  null,
  'Hello, React!'
);
```

As you can see JSX is actually syntactic sugar around Javascript expressions. In this example `<h1>` tag is equivalent of calling `React.createElement` and passing `h1` as first argument.

## Using HTML Elements

One of the things you need to remember is even though **JSX** resembles **HTML**, it is not **HTML**. Here are some differences to keep in mind:

* attributes are now camelCased

  Attributes that had no case at all for example `onclick` is now `onClick`.

* `class` becomes `className`

  `class` is reserved name in Javascript, so you need to use `className` instead:

  ```jsx
  <div className="navbar" />
  ```

* `for` becomes `htmlFor`

  `for` is also a reserved word, you have to use `htmlFor` instead.

  ```jsx
  <label htmlFor="username">Username</label>
  <input type="text" id="username" name="username" />
  ```

* style attribute changes syntax

  In **JSX** you pass Javascript object to `style` attribute. Therefore `css` fields will have to be camelCased:

  ```jsx
  <div style={{fontSize: 12, backgroundColor: "#333333"}} />
  ```

## Including Javascript In Your JSX

You can have actual Javacript expressions inside your JSX.

To do this you need to wrap them into curly braces. Here is an example:

```jsx
<div>
  { 2 + 2 }
</div>
```

And it can be any Javascript code. You can have loops, conditions and even switch statements there.

## JSX is Converted To Javascript Expressions

JSX is not supported by browser by defult, it needs to be **transpiled**. Which means it needs to be converted to regular Javascript code that can be understood by the browser. 

To do this we use [Babel](https://babeljs.io/).

You can play around with transpiling **JSX** to Javascript at [Babel Interactive Playground](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=FBA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=true&targets=&version=7.3.3)