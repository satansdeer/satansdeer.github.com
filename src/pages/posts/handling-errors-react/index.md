---
title: Handling Errors In React
date: 2019-03-10T04:16:45.284Z
categories: React
image: errors.jpg
---

One of the problems you might face when working on your React application is that some error happens in one of your components - it breaks the whole app.

To solve this problem React has **error boundaries**.

## What Is An Error Boundary

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

**Error Boundary** components have `componentDidCatch(error, info)` implemented. Unlike other life cycle methods, `componentDidCatch` will get called only if any error will occur during rendering, lifecycle methods or inside `constructor` of it's children components.

## Creating Error Boundary

In code, **Error Boundary** component will look like this:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Error occurred!</h1>;
    }
    return this.props.children;
  }
}
```

## Where To Use Error Boundaries

We can use this Error Boundary component as a normal component in our code.

```jsx
<ErrorBoundary>
  <ComponentThatCanCrash />
</ErrorBoundary>
```

Now if `ComponentThatCanCrash` will throw any error during rendering, in lifecycle method, or in `constructor`, `componentDidCatch` of `ErrorBoundary` component will change the `state.hasError` to `true` and display `Error occured!` instead of broken component.
