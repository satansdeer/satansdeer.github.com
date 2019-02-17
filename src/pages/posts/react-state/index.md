---
title: React 16 Course - Managing State
date: 2018-03-22T04:58:45.284Z
categories: React
image: state_thumb.jpg
---

`state` in react is a plain javascript object used to manage data specific to some component. Keep in mind that only data that is going to be needed for rendering should belong to the state.

## Contents

* [What Is State](#what_is_state)
* [Difference from Props](#differente_from_props)
* [Setting Initial State](#setting_initial_state)
  * [Using `getInitialState` method](#getinitialstate)
  * [Inside `constructor` method](#insideconstructor)
  * [As a class property](#asaclassprop)
* [Updating State](#updating_state)
  * [First Rule Of Updating State](#first_rule)
  * [Warning, `setState` Is Asynchronous](#warning_async)
  * [State Updates Are Merged](#state_merged)

<a name="what_is_state"></a>
## What Is State

So basically `state` is a plain javascript object where component stores relevant data. The difference between `state` and any other object you can store inside your component is that React monitors it and will trigger re-render on `state` update.

As state updates cause re-render – it makes sense to only store variables that are needed for rendering. So if you have some variable related to the component, but that you don't use in your `render` method – it makes sense to just use it as a regular instance variable and not put it into `state`.

Also, consider `state` as private to the component. So you can only access or update `state` from inside the component. You can't access it from its parent nor from its children.

<a name="differente_from_props"></a>
## Difference From Props

Just like `props` – `state` is an object and it causes the component to re-render when updated. The difference is that `props` come from parent component and `state` is internal to the component.

Also, you can't update props inside component itself. Basically `props` come from outside and component has no control over it, and `state` is internal and component fully controls it.

Here is the diagram:

![state vs props](/state_vs_props.png)

<a name="setting_initial_state"></a>
## Setting Initial State

There are several methods of defining the initial state of your component.

* [Using `getInitialState` method](#getinitialstate)
* [Inside `constructor` method](#insideconstructor)
* [As a class property](#asaclassprop)

<a name="getinitialstate"></a>
### Using `getInitialState` Method

If you define your component using `React.createClass` – use `getInitialState`;

```js
import React from 'react';

const ExampleComponent = React.createClass({
  getInitialState () {
    return {
      someKey: 'someValue'
    };
  },

  render() {
    return (
      <div>{this.state.someKey}</div>
    );
  }
});

export default ExampleComponent;
```

<a name="insideconstructor"></a>
### Inside `constructor` Method

If you define your component using `ES6` classes – define the `state` inside your `constructor` method:

```js
import React from 'react';

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someKey: 'someValue'
    };
  }
  render() {
    return (
      <div>{this.state.someKey}</div>
    );
  }
}

export default ExampleComponent;
```

Keep in mind that in order for `this` to be defined in your `constructor` – you should call `super()` first. Also, don't forget to accept `props` as an argument and pass it to `super` as well.

<a name="asaclassprop"></a>
### As a Class Property

Another option if you use `ES6` classes would be using class property. It allows you to write way less boilerplate:

```js
import React from 'react';

class ExampleComponent extends React.Component {
  state = { someKey: 'someValue' }

  render() {
    return (
      <div>{this.state.someKey}</div>
    );
  }
}

export default ExampleComponent;
```

<a name="updating_state"></a>
## Updating State

There are several things to note about updating state:

* [First Rule Of Updating State](#first_rule)
* [Warning, `setState` Is Asynchronous](#warning_async)
* [State Updates Are Merged](#state_merged)

<a name="first_rule"></a>
### First Rule Of Updating State

And first rule of updating state is "Never tell anyone about updating state", oh wait, it's from somewhere else. First rule is – don't update `state` directly:

```js
// DON'T
this.state.someValueInState = 'NEW VALUE';
```

There is only one exception for setting state directly – you can define your initial state in your constructor

In all other places `this.setState` instead.

```js
this.setState({someValueInState: 'NEW VALUE'});
```

<a name="warning_async"></a>
### Warning, `setState` Is Asynchronous

Here are two things to note. First, don't rely on `this.state` and `this.props` when calculating next state, as they might be updates asynchronously.

```js
// DON'T
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

For such cases use the form of `setState` that accepts `function` instead of `object`:

```js
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

And second thing – as `setState` updates state asynchronously – you cant rely on `this.state` immediately after calling `this.setState`.

If you need some code to be executed only after state is really updated and all values are assigned – use callback provided by `this.setState`.

```js
this.setState({
    someKey: 'someValue',
  }, () => {
    // This will be executed only after state is really updated
  }
);
```

<a name="state_merged"></a>
### State Updates Are Merged

When you call setState(), React merges the object you provide into the current state. So you don't have to worry about overriding values you don't want to override.

Imaging having some state with two fields defined in your constructor:

```js
constructor(props) {
  super(props);
  this.state = {
    someKey: 'someValue',
    someOtherKey: 'someOtherValue'
  };
}
```

Now you can update them individually by calling `setState`:

```js
this.setState({
  someKey: 'someNewValue'
});
```

In this example `this.state.someOtherKey` will remain unchanged.

## Free React Course

I'm going to release the whole course about modern react. It will be completely free, subscribe to mailing list to not miss the day when it will be out 😀.

<sign-up-form></sign-up-form>
