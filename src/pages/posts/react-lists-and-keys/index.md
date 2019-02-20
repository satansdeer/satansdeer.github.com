---
title: Lists And Keys In React
date: 2019-02-20T01:58:45.284Z
categories: React
image: lists_and_keys.jpg
---

How to display lists of elements in React?

You can use `map` method to loop through an array of items and then use curly braces to insert it into your jsx code:

```jsx
const todos = ["buy milk", "learn react", "walk the dog"];

const ToDoList = () => (
  <ul>
    {todos.map(todo => (
      <li>{todo}</li>
    ))}
  </ul>;
};
```

Here we mapped through the array of `strings` array using the array `map()` method. We return `li` element for each item. If you run this code - you'll get a warning that you need to provide keys for your list items.

## Providing Keys

React keeps track of the identity of each list item by it's `key` attribute. Using this prop it determines what items were added, changed or removed.

It's important that this key should be uniquely associated with each list item, ideally it should be some unique id:

```jsx
const todos = [
    {text: "buy milk", id: 0},
    {text: "learn react", id: 1},
    {text: "walk the dog", id: 2}
];

const ToDoList = () => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.text}
      </li>
    ))}
  </ul>;
};
```

If your items don't have unique identifiers you can use `map` with `index` as last resort. It's not optimal solution because this `index` won't be bound to specific element and if the order of your element changes - the index will also change.

```jsx
const todos = ["buy milk", "learn react", "walk the dog"];

const ToDoList = () => (
  <ul>
    {todos.map((todo, index) => (
      <li key={index}>{todo}</li>
    ))}
  </ul>;
};
```

It is important that `keys` would be unique among siblings, so in our example we can't use `todos` values as keys. We can't guarantee that our todos won't have duplicates.

## Using Lists With Components

In previous examples we were using `li` items, but in real React applications you'll often use custom components inside your lists.

```jsx
const todos = [
    {text: "buy milk", id: 0},
    {text: "learn react", id: 1},
    {text: "walk the dog", id: 2}
];

const ToDoList = () => (
  <ul>
    {todos.map((todo) => (
      <ToDoItem key={todo.id} text={todo.text} />
    ))}
  </ul>;
};
```

Keys are provided for elements inside of the loop, so you need to provide it inside of the component, or to component children:

```jsx
const todos = [] // your todos

const ToDoItem = ({ text }) => <li key={text}>text</li>;
// THIS IS WRONG

const ToDoList = () => (
  <ul>
    {todos.map((todo) => (
      <ToDoItem key={todo.id} text={todo.text} />
    ))}
  </ul>;
};
```

Here is the correct example:

```jsx
const todos = [] // your todos

const ToDoItem = ({ text }) => <li>text</li>;
// THIS IS WRONG

const ToDoList = () => (
  <ul>
    {todos.map((todo) => (
      <ToDoItem key={todo.id} text={todo.text} />
    ))}
  </ul>;
};
```

## Recap

When you render lists in React you have to specify a special `key` prop for your items. It is required for React to effectively track changes in the list.

You should provide keys only to the outermost items inside your list, not their children.
If you use custom components, like `ToDoItem` in our example - you should keep the `key` on the `<ToDoItem />` elements, and not inside the component.

Keys should be unique across siblings in your list. In case if you can't provide unique id's you can use `map()` with `index`, but that's not optimal and should be used only as last resort.
