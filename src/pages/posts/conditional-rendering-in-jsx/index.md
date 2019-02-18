---
title: Conditional Rendering In JSX 
date: 2019-02-18T01:58:45.284Z
categories: React
image: conditions_in_jsx.jpg
---

There are many ways to have conditional expressions in your JSX code. Let's look at them.

## If Statement

The easiest way to have condition in your render code is to use `if` statement in `render()` method of your component.

```jsx
function ToDoList({ items }) {
  if (!items.length) {
    return <p>You don't have any TODO items.</p>;
  }

  return <div>{items.map(item => <ToDoItem item={item} />)}</div>;
}
```

You can also use this method to prevent component from rendering, by returning `null` early in render code.

```jsx
function ErrorMessage({ error }) {
  if (!error) {
    return null;
  }

  return <div class="error">{error.message}</div>;
}
```

In this example if the prop `error` will be false component won't render.

It is the most simple way, often used for early return from your component rendering code.

## Ternary Operator

More compact option is to use [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

```js
condition ? expr1 : expr2;
```

Here is an example.

```jsx
function Greeting({ user }) {
  return <div>{user ? <p>Hello {user.name}!</p> : <p>Please log in.</p>}</div>;
}
```

Ternary operators can be nested. Let's have a look at this modified example for `ToDoList`. Now it is also accepting the `isLoading` prop.

```jsx
function ToDoList({ items, isLoading}) {
    return isLoading ? <p>Loading...</p> : (
        items.length ? <div>{items.map(item => <ToDoItem key={item.id} item={item} />}</div> : <p>ToDo list is empty</p>  )
    )
}
```

In general I would recommend to avoid that as it makes code less readable.

Overall ternary operator is a great way to have conditions in your **JSX**. I recommend useing them over `if/else` statements.

## Logical AND

Often times you don't need the `else` part of your ternary operator. Instead of returning `null` there you can use `&&`. It works like this:

```jsx
<div>{isLoading && <p>Loading...</p>}</div>
```

If isLoading is `false`, this code will result in just empty `<div/>`.

## Switch Case

You can use `switch` staements inside your component `render()` method. It can be useful when you have multiple options to render.

```jsx
function Notification({ message, type }) {
  switch (type) {
    case "info":
      return <Info text={message} />;
    case "warning":
      return <Warning text={message} />;
    case "error":
      return <Error text={message} />;
    default:
      return null;
  }
}
```

It's important to always have the `default` in your `switch` statements.

## ENUMs

If Javascript you can use an object consisting of key-value parts as an ENUM.

For example here is a size enum:

```jsx
const sizes = {
  small: 1,
  medium: 2,
  large: 3
};
```

This opens great possibilities for conditional rendering in React, because you can use **components** as values in your enum and then access them by their keys.

```jsx
function Notification({ message, type }) {
  return (
    <div>
      {
        {
          INFO: <Info text={message} />,
          MESSAGE: <Warning text={message} />,
          ERROR: <Error text={message} />
        }[type]
      }
    </div>
  );
}
```

This way you can use enums instead of `switch-case` statements.
