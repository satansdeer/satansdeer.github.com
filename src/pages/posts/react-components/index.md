---
title: React Components
date: 2019-02-21T01:58:45.284Z
categories: React
image: react_components.jpg
---

Introduction to ReactJS Components.

## What Is Component

A component is an isolated piece of interface. It contains some piece of layout describing what should appear on the screen. It can also have some bound state and contain some business logic.

There are two major ways of defining components: using functions and using classes.

Regardless of how you define your components their name should start with capital letter.

## Functional Components

Most simple way to define a component is to use a function:

```jsx
const SimpleComponent = () => {
  return <div>Very basic component.</div>;
};
```

It is a simple Javascript function, you can use both regular and arrow functions for it.

If you use arrow function to define your component and you only have layout code there - you can omit curly brackets and return statement:

```jsx
const SimpleComponent = () => <div>Very basic component.</div>;
```

If your code takes more than one line - just wrap it into brackets:

```jsx
const SimpleComponent = () => (
  <div>
    <h1>More Complex Component</h1>
    <p>Contains multiple lines.</p>
  </div>
);
```

## Class Based Components

Another option is to define component as a class extending `React.Component`:

```jsx
class SimpleComponent extends React.Component {
  render() {
    return <div>Very basic component.</div>;
  }
}
```

If you define your component using class - you should define `render()` method.

## Composing Components

Biggest strength of using components is that you can break down complex UI into small and manageable pieces.

Inside your components you can refer to other components and render them as children.

```jsx
const Header = () => <>{/* Some Header Layout */}</>;

const LoginForm = () => <>{/* Login Form Layout */}</>;

const LoginPanel = () => (
  <div>
    <LoginForm />
  </div>
);

const LoginPage = () => (
  <>
    <Header />
    <LoginPanel />
  </>
);
```

## Rendering Your Components

Typical React application has one root component that is being rendered to DOM. Inside that component it refers to all other component that belong to the app.

```jsx
const App => () (
  <h1>Simple app.</h1>;
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Here we call `ReactDOM.render()` with the `<App />` element.
Our App component returns a `<h1>Simple app.</h1>` element as the result.
ReactDOM updates the DOM to match `<h1>Simple app.</h1>`.
