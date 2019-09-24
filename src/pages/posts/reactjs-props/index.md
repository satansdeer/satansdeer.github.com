---
title: React Props
date: 2019-02-24T04:58:45.284Z
categories: React
image: thumb.jpg
---

In ReactJS `props` is how components get data from their parent. When you add a tag to your JSX code and pass it some attributes - the components referenced by this tag will receive them as a `props` object.

```jsx
<UserCard name="Maksim" surname="Ivanov" />
```

In this example `name` and `surname` will end up in `props` object that will look like this:

```js
{
    name: 'Maksim',
    surname: 'Ivanov',
    // Other props...
}
```

Components defined as a function get `props` as an argument:

```jsx
const UserCard = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.bio}</p>
    </div>
  )
}
```

In class components `props` are available as `this.props` on Component instance.

```jsx
import React, { Component } from 'react'

class UserCard extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.bio}</p>
      </div>
    )
  }
}
```

## Props Are Read-Only

Regardless of how did you define your component, as function or a class, you must never modify `props`.

You can only read their values and **never** modify them. It is a convention you need to accept when using ReactJS.

## Children

There is a special kind of `prop` called `children`. This `prop` contains values passed in the body of the component:

```jsx
<ParentComponent>
  <ChildComponent/>
</ParentComponent>
```

In this example `<ChildComponent>` will be available inside `<ParentComponent>` as `props.children`:

```jsx
const ParentComponent = ({children}) => (
    <div>
      {children}
    </div>
)
```

You can use it inside your components layout to render items passed as the body of your component.