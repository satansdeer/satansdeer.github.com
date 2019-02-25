---
title: Handling Events In ReactJS
date: 2019-02-25T04:58:45.284Z
categories: React
image: props_thumb.jpg
---

Handling events in ReactJS is very similar to how it's done on DOM elements. There are a few differences though.

Event names are camelCased, so instead of `onclick` you have to use `onClick`:

```jsx
<button onclick="toggleDropdown()">Categories</button>
// DOM example

<button onClick={toggleDropdown}>Categories</button>
// JSX example
```

Also as you can see event handler function instead of a string.

## Event Handlers

Event handlers are defined as methods on class based components:

```jsx
class ExampleComponent extends React.Component {
    handleClick(e){
        // ... code to be executed on click
    }
}
```

All handlers receive an `event` object that adheres, cross-browser, to the [W3C UI Events spec](https://www.w3.org/TR/DOM-Level-3-Events/).

## Reference To `this`

If you are going to use reference do `this` in your event handler, for example to call `this.setState` - don't forget to bind it.

```jsx
class ExampleComponent extends React.Component {
    state = {counter: 0}

    increment(e){
        this.setState({counter: this.state.counter + 1})
        // Here you'll get an error because of wrong
        // reference to `this`
    }

    render(){
        return <button onClick={this.increment}>Increment</button>
    }
}
```

You have several options on how to bind `this`:

### Bind In Render

You can use Javascript method `bind` right where you assign your event listener to make it keep correct reference to `this`.

```jsx
render(){
  return <button onClick={this.increment.bind(this)}>Increment</button>
}
```

Downside of this method is that `increment` function will be allocated on each render. In some cases it will lead to performance drop.

### Arrow Functions In Render

Alternatively you can use arrow functions. You can use them in `render()` method:

```jsx
render(){
  return <button onClick={e => this.increment(e)}>Increment</button>
}
```

This will cause same problems as with binding functions in `render()`.

### Bind In Constructor

You can avoid allocating function on every render if you call `bind` inside of the `constructor`.

```jsx
class ExampleComponent extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
//...
```

This is preferred way of binding.


### Arrow Functions In Class Property

If you use `babel` with the property initializing syntax (enabled by default in `create-react-app`) you can define your handlers as arrow functions on your class fields.

```jsx
class ExampleClass extends React.Component {
  // ...

  increment = e => {
    this.setState({counter: this.state.counter + 1})
    // Here it will have correct reference to `this`
  }

  // ...
}
```
