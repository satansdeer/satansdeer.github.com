---
title: React Pure Components
date: 2019-03-10T02:10:45.284Z
categories: React
image: pure_components.jpg
---

By default, a plain `React.Component` has `shouldComponentUpdate` set to return `true`. You can write your own implementation of this method to avoid unnecessady re-renders.

## What Is PureComponent?

React provides `React.PureComponent` that has `shouldComponentUpdate` implemented so that it performs **shallow** comparison of component `props` and `state`.

**Shallow** comparison means that when comparing objects, Javascript does not compare their's attributes - only their references (e.g. "do they point to same object?).

For example:

```js
const user = {
  name: "John",
  surname: "Doe"
}

const secondUser = user;
user.name = "Jane";

console.log(user === secondUser); // true
```

Notice you changed users name. Even with this change objects are equal. They references are exactly same.

Now if instead of changing the attributes we'll clone the object - we'll get different result.

```js
const clone = obj => Object.assign({}, ...obj);

const secondUser = clone(user);
console.log(user === secondUser); // false
```

Main benefit of using shallow check for equality is that it's _really_ fast.

So basically using `PureComponent` is an equivalent of writing your own `shouldComponentUpdate` with the following code:

```jsx
if (type.prototype && type.prototype.isPureReactComponent) {
    shouldUpdate = !shallowEqual(oldProps, props) ||
                   !shallowEqual(oldState, state);
}
```

It's preferred to use `PureComponent` instead of implementing your own `shouldComponentUpdate` function.

It's important to note here that if `props` or `state` contain some complex data structures and some deeply nested parts of them will change - `PureComponent` might produce false negatives and your component won't be re-rendered.

Overall if your React component’s `render()` function renders the same result given the same props and state - you can get performance boost if you will use `PureComponent`.

If you use functional component - you can wrap it into `React.memo` for similar result.

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```