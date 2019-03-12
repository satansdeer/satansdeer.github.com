---
title: Starting With JSX
date: 2019-02-17T01:58:45.284Z
categories: React
image: starting_with_jsx.jpg
---

`youtube:https://www.youtube.com/embed/Z9XppQBgArc`

Today we continue to learn ReactJS. In this React tutorial for beginners you'll get familiar with **JSX** - syntax used in React applications to describe the layout of your components.

At this moment I expect you to know [what is React](https://maksimivanov.com/posts/introduction-to-reactjs/) and [how to setup React Applications](https://maksimivanov.com/posts/how-to-install-react/).

## Introduction to JSX

Even though it is possible to use ReactJS without JSX - using it makes working with ReactJS components a lot easier.

Look at these examples:

_With JSX:_

```jsx
const element = <h1>Hello React!</h1>;
```

<br/>

_Without JSX:_

```jsx
const element = React.createElement("h1", null, "Hello, React!");
```

As you can see JSX is actually syntactic sugar around Javascript expressions.

> **Syntactic sugar** is a feature of language that let's you do something in an alternative, easier way. For example you can type `x = x + 5`, to increment `x` by 5 but you can also do it by writing `x += 5`.

In this example `<h1>` tag is equivalent of calling `React.createElement` and passing `h1` as first argument.

It is important to note that as all **JSX** expressions get converted to `React.createElement` - `React` should always be in scope when you write your **JSX** code. So don't forget to import it in your `jsx` files.

There are four things that can end up in JSX code:

* Strings
* HTML elements
* Custom components
* Javascript code

## Using Strings In JSX

This is not a surprise that you can use simple text inside of your JSX code.

```jsx
<p>Simple paragraph of text</p>
```

React escapes html strings by default.

```jsx
const text = "<h1>Html layout inside a string<h1>";

<p>{text}</p>
```

Here  you'll see `jsx` actually output the `"<h1>Html layout inside a string<h1>"` string, instead of rendering it as HTML.

You can insert HTML entities within literal text in JSX:

```jsx
<div>First &middot; Second</div>
```

## Using HTML Elements

JSX tags that start from lowercase letter render as HTML tags.

One of the things you need to remember is even though **JSX** resembles **HTML**, it is not **HTML**. Here are some differences to keep in mind:

* attributes are now `camelCased`

  Attributes that had no case at all for example `onclick` is now `onClick`.

  ```jsx
  <button onClick={clickHandler}>Click me</button>
  ```
  
  **There are two exceptions** `data-*` and `aria-*` attributes that stay lowercased.

  ```jsx
  <div aria-hidden={true} />

  <div data-custom-attribute="some-value" />
  ```

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

  In **JSX** you pass Javascript object to `style` attribute. Therefore `css` fields will have to be `camelCased`:

  ```jsx
  <div style={{ fontSize: 12, backgroundColor: "#333333" }} />
  ```

## Using Custom Components

You can define your own components. There is one important rule though. Your custom component names **should always start with capital letter**.

This is due to the fact that React determines if it should use custom component refence or html tag depending on the first letter of the tag name. If it's capital letter - it will use custom component reference, otherwise - html element.

There are mainly two ways of defining a component in react: using class or using a function.

If you define a class based component - you have to define `render()` function to specify the layout of your component.

```jsx
class ExampleComponent extends React.Component {
  render() {
    return "Hello! I'm custom class component!";
  }
}
```

Another option is to define your component as a function:

```jsx
const ExampleComponent = () => "Hello! I'm custom functional component!";
```

## Including Javascript In Your JSX

You can have actual Javascript expressions inside your JSX.

To do this you need to wrap them into curly braces. Here is an example:

```jsx
<div>{2 + 2}</div>
```

You can use it to display values of the variables or constants:

```jsx
const text = "Hello i'm a text!"

<div>{text}</div>
```

You also can pass Javascript expressions as attributes.

```jsx
<div data-custom-field={2+2} />
```

## How To Comment JSX

Now how do you add comments to your JSX code?

First problem is that `JSX` is not `HTML` and `HTML` comments won't work:

```html
render(){
  <div>
    <!-- <SomeComponent /> --> // This won't work
  </div>
}
```

Even though JSX will be compiled to Javascript - you can't use regular JS comments. They will be parsed as text and added to your layout.

So the only working option is to **use multiline comments inside curly braces**:

```jsx
render() {
  return (
    <div>
      <Component1 />
      {/* <Component2 /> */}
    </div>
  )
}
```

## JSX is Converted To Javascript Expressions

JSX is not supported by browser by default, it needs to be **transpiled**. Which means it needs to be converted to regular Javascript code that can be understood by the browser.

To do this we use [Babel](https://babeljs.io/).

You can play around with transpiling **JSX** to Javascript at [Babel Interactive Playground](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=FBA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=true&targets=&version=7.3.3)

You'll see that all the JSX expressions become just calls to `React.createElement`. This method takes three attributes. First goes kind of the element you are going to create. It will be string if you create html elements, like `<h1 />`, `<div />` or `<p />`. Otherwise it will be reference to your custom component.

Next goes list of attributes passed to the element. It is a simple Javascript object. It's also a reason why the attributes passed to JSX should be `camelCased`.

And the last attribute is children of this element.

## Nesting JSX Elements

You can nest your JSX elements like this:

```jsx
<article>
  <p>This shouldn't be a surprise for you.</p>
</article>
```
