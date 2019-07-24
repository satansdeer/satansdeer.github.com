---
title: React Context API
date: 2019-03-29T01:58:45.284Z
categories: React
image: thumb.jpg
---

In React application data and event handlers are passed down to children components through props. But sometimes you need to make some data available on several levels at once.

Passing data through props manually can be cumbersome.

To solve this problem react provides context api.

You create context using `React.createContext()`. This method returns **context** object:

```js
{
  Provider, Consumer;
}
```

Simply speaking it's two components `Provider` and `Consumer`. You pass data into `Provider` and then you can access it from the connected `Consumer`.

![context api](/portals.png)

Here is a simple example.

```jsx
import React, { createContext } from "react";

const { Provider, Consumer } = createContext();
// We use destructuring assignment to get Provide and Consumer

const App = () => (
  <Provider value={{ valuePassedThroughContext: "Success!" }}>
    <ChildComponent />
  </Provider>
);
// Inside our app we wrap components that will need the data
// into our Provider

const ChildComponent = () => (
  <Consumer>
    {value => {
      // Consumer requires a function as a child
      // and passes the `value` from Provider
      // down to it.
    }}
  </Consumer>
);
```

We can use `Consumer` on any level of nesting.

It will get data from it's provider anywhere down the tree.

One important note here that `Consumer` will only get data from the `Provider` it was created with.

## Passing Default Value

You can pass the default value to `React.createContext`:

```jsx
const { Provider, Consumer } = React.createContext(defaultValue);
```

This will affect only consumer and only if it won't have matching `Provider` anywhere above it in the tree.

In this case the **default value** will be passed to `Consumer` function:

```jsx
<Consumer>
  {defaultValue => {
    // some code
  }}
</Consumer>
```

## Dynamic Values

All consumers that are descendants of a `Provider` will re-render whenever the Provider’s `value` prop changes.

Here is an example:

**counter-context.jsx**

```jsx
import React, { createContext } from "react";

const { Provider, Consumer: CounterConsumer } = createContext(0);

class CounterProvider extends React.Component {
  state = { counter: 0 };

  componentDidMount() {
    this.tickInterval = setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  render() {
    <Provider value={this.state.counter}>{this.props.children}</Provider>;
  }
}

export { CounterProvider, CounterConsumer };
```

**counter-view.jsx**

```jsx
import React, { Component } from "react";
import { CounterConsumer } from "./counter-context";

export const CounterView = () => (
  <CounterConsumer>{counter => <p>Current tick: {counter}</p>}</CounterConsumer>
);
```

**app.js**

```jsx
import React, { Component } from "react";
import { CounterProvider, CounterConsumer } from "./counter-context";

class App extends Component {
  render() {
    return <>
      <CounterProvider>
        <CounterView>
      </CounterProvider>
      <CounterView/>
    </>;
  }
}

ReactDOM.render(<App />, document.root);
```

In this example the first `CounterView` will update on every tick.

Second one will always show the default value, because it doesn't have corresponding `Provider` up in the tree.

## Passing Functions

You can also pass functions through context. It is useful if you want to update `Provider` value from **consumers**.

**auth.jsx**

```jsx
import React, { Component, createContext } from "react";

const { Provider, Consumer: AuthConsumer } = createContext({ loggedIn: false });

class AuthProvider extends Component {
  state = { loggedIn: false };

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    return (
      <Provider value={{ loggedIn, logIn: this.logIn }}>
        {this.children}
      </Provider>
    );
  }
}

export { AuthProvider, AuthConsumer };
```

Here we created context and used **destructuring assignment** to create two variables `Provider` and `AuthConsumer`.

To create variable `AuthConsumer` we renamed the original `Consumer` that we gon from `React.createContext`method.

Then we defined a class `AuthProvider` that manages authorisation state. It wraps children in `Provider` and passes the `loggedIn` state and `logIn` function to this `Provider`.

**app.jsx**

```jsx
import React from "react";
import { AuthProvider, AuthConsumer } from "./auth";

const App = () => (
  <AuthProvider>
    <Content />
  </AuthProvider>
);

const Content = () => {
  <AuthConsumer>
    {({ loggedIn, logIn }) =>
      loggedIn ? (
        <p>Congrats! You are logged in!</p>
      ) : (
        <button onClick={logIn}>Log in</button>
      )
    }
  </AuthConsumer>;
};
```

## Using Multiple Contexts

It is possible to use multiple contexts at once.

But you'll have to use separate consumer for each provider:

```jsx
import React from "react";

const AuthContext = React.createContext({ loggedIn: false });

const ProfileContext = React.createContext({ name: "Tom" });

const App = () => (
  <AuthContext.Provider value={theme}>
    <UserContext.Provider value={signedInUser}>
      <Content />
    </UserContext.Provider>
  </AuthContext.Provider>
);

function Content() {
  return (
    <AuthContext.Consumer>
      {({ loggedIn }) => (
        <ProfileContext.Consumer>
          {user =>
            loggedIn ? (
              <p>Logged as: {user.name}</p>
            ) : (
              <p>You are not logged in</p>
            )
          }
        </ProfileContext.Consumer>
      )}
    </AuthContext.Consumer>
  );
}
```

It is required by React to keep each consumer a separate node in the tree.

## When To Use Context

You should consider using React Context API when you have some data and maybe callbacks you need to share between multiple components, but you would have to pass them through layers of components that don't need that data or callbacks.



