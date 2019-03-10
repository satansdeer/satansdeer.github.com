---
title: React Synthetic Events
date: 2019-03-10T03:09:45.284Z
categories: React
image: react_dev_tools.jpg
---

The events that you get when your event handlers get triggered are actually `SyntheticEvents` - an abstraction around browser events provided by React.

It has the same interface as the browser’s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.

Why is it important?

For several reasons, first of them is that React reuses the `SyntheticEvent` objects by pooling them.

That means that after an event handler is invoked all the properties of the `event.target` are nullified.

```js
function onClick(event) {
  console.log(event.type); // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
  }, 0);

  this.setState({clickEvent: event});
  // Won't work. As state updates are asynchronous
  // this.state.clickEvent will only contain null values.

  this.setState({eventType: event.type});
  // You can still export event properties.
}
```

You can call `event.persist()` to remove the event from the pool allowing references to the event to be retained asynchronously.

```js
function onClick(event) {
  event.persist();
  console.log(event.type); // => "click"

  setTimeout(function() {
    console.log(event.type); // => "click"
  }, 0);

  this.setState({clickEvent: event});
  // Now it will work, as we've called event.persist()
}
```

But more common and recommended solution would be to cache all the needed values:

```js
function onClick(event) {
  console.log(event.type); // => "click"
  const eventType = event.type

  setTimeout(function() {
    console.log(eventType); // => "click"
  }, 0);

  this.setState({clickEvent: { eventType }});
}
```

Here we are saving the `event.type` field. It can also be `target.value` if you want to store some input value for example.

```js
function onChange(event) {
  console.log(event.target.value); // value of your text input
  const { value } = event.target;

  this.setState({ inputValue: value });
}
```