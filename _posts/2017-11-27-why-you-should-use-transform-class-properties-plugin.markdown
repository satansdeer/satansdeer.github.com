---
layout: post
title:  "Why Should You Use Transform Class Properties Plugin"
date:   2017-11-27 20:58:45 +0300
categories: js react babel
state: hidden
image: modal_window_react.jpg
comments: true
---

In my previous article I used pretty interesting syntax to define class methods for my `Popup` component. I was able to use arrow function to change the scope of this to class level. Hmm, but it's not actually Javascript, so how did I do that?

First let's refresh your memory, i'm talking about this code:

```html
import React, { Component } from 'react';
import Popup from './Popup';
import SubscriptionForm from './SubscriptionForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  openPopup = () => {
    this.setState({
      isOpen: true
    });
  }

  closePopup = () => {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.openPopup}>
          Click Me!
        </button>

        <Popup show={this.state.isOpen}
          onClose={this.closePopup}>
          <SubscriptionForm></SubscriptionForm>
        </Popup>
      </div>
    );
  }
}

export default App;
```

Look, at the `openPopup` for example. That's exactly what `transform-class-properties` allowed me to do.

If not it `this` in that function would reference global scope instead of the scope of `App` class. Probably I would get an error like `Uncaught TypeError: Property 'setState' of object [object Object] is not a function`.

## But What Are The Alternatives

More traditional and verbose approach would be to bind `this` manually. You can do this inside the `constructor` method.

```js
  constructor(props) {
    super(props);

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = { isOpen: false };
  }
```

You have to do this for every funcion that will use `this` reference, and it's very repetitive.

## Also You Can Bind In Render Function

There you can bind verbosely, like this:

```html
<button onClick={this.openPopup.bind(this)}>
```

Or by using arrow functions:

```html
<button onClick={e => this.openPopup(e)}>
```

Both of these require additional hassle, look ugly to me, and have performance implications as you basically reallocate function on every render.

## Summary

This is why you better use class level properties. And by the way there is a [proposal about class fields](https://github.com/tc39/proposal-class-fields) for future JS verisions and it's already __Stage 3__. That means that it's very likely to become part of the language.
