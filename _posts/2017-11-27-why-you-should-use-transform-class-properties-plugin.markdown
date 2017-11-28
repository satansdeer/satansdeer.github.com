---
layout: post
title:  "Why Should You Use Transform Class Properties Plugin"
date:   2017-11-27 20:58:45 +0300
categories: js react babel
image: class_level_properties.jpg
comments: true
---

In my [previous post](http://maksimivanov.com/react-modal-window) I used pretty interesting syntax to define class methods for my `Popup` component. I was able to use arrow functions to change the scope of `this` to class level. Hmm, but it's not actually Javascript, so how did I do that?

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

Look, at the `openPopup` for example. That `openPopup = ` is exactly what `transform-class-properties` allowed me to do.

```js
openPopup = () => {
  this.setState({
    isOpen: true
  });
}
```

Also it allowed me to use arrow function here. If not it `this` in that function would reference global scope instead of the scope of `App` class. Probably I would get an error like `Uncaught TypeError: Property 'setState' of object [object Object] is not a function`.

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

## You Can Bind In Render Function

For example by using `bind(this)`:

```html
<button onClick={this.openPopup.bind(this)}>
```

Or by using arrow functions:

```html
<button onClick={e => this.openPopup(e)}>
```

Both of these require additional hassle, look ugly and have performance implications as you basically reallocate the function on every render.

## Summary

This is why you better use class level properties. And by the way there is a [proposal about class fields](https://github.com/tc39/proposal-class-fields) for future JS versions and it's already __Stage 3__. That means that it's very likely to become part of the language.

If you are interested in learning new Javascript features (maybe even ones that are not included yet) – make sure to subscribe to my mailing list:

<p>
  <div id="root"></div>
  <script type="text/javascript" src="/assets/javascripts/bundle.js" charset="utf-8"></script>
</p>
