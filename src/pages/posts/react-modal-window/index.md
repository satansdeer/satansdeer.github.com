---
title: Popup With ReactJS For Jekyll Blog
date: 2017-11-23T20:58:45.284Z
categories: js react
image: modal_window_react.jpg
comments: true
---

Once upon a time (yesterday) I decided that my blog lacks a good old popup. You know, the one that unannoyingly asks to join the mailing list. So if you have jekyll blog and you want to know how to create a popup using __ReactJS__ –this post is totally relevant.

First let's get all pragmatic and see an example of what we'll get.

<p>
  <div id="root"></div>
  <script type="text/javascript" src="/assets/javascripts/bundle.js" charset="utf-8"></script>
</p>

In this article I'm assuming that you are using __github pages__ to host your jekyll blog.

## Let's Get Our Hands Dirty

To be able to compile `.jsx` code – first we need to setup `webpack`.

Start by creating `package.json` in your root directory.

```bash
➜ npm init
```

After answering all required question and cleaning out unnecessary stuff you should end up with something like this:

```json
{
  "name": "satansdeer.github.com",
  "version": "1.0.0",
  "description": "Maksim Ivanov jekyll blog",
  "author": "Maksim Ivanov",
  "license": "ISC",
  "devDependencies": {
  }
}
```

Now let's install required dependencies:

```bash
➜ npm install webpack babel-core babel-loader babel-preset-es2015 babel-preset-react react react-dom babel-plugin-transform-class-properties --save-dev
```

Create the `.babelrc` with presets configuration:

```bash
➜ echo '{ "presets": ["react", "es2015"] }' > .babelrc
```

Configure webpack, put this in your `webpack.config.js`:

```js
const path = require('path');

module.exports = {
  entry: "./front/entry.js",
  output: {
    path: path.join(__dirname, "/assets/javascripts"),
    filename: "bundle.js"
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        plugins: ['transform-class-properties']
      }
    }
    ]
  }
};
```

## Test Run

Make `front` folder:

```bash
➜ mkdir front
```

And create file `entry.js` there with some console output for testing.

```bash
➜ echo 'console.log("It works!")' > front/entry.js
```

Run webpack, it should build your `bundle.js` inside `/assets/javascripts` folder.

```bash
➜ webpack
```

Now put add this line in your layour. I don't know maybe in your footer or just in the bottom of your `_layouts/default.html`:

```html
<script type="text/javascript" src="/assets/javascripts/bundle.js" charset="utf-8"></script>
```

Open your site. You should see `It works!` in javascript console. If not – double check webpack config and make sure that `bundle.js` was built.

## Add React

Create `components` folder:

```bash
➜ mkdir front/components
```

And add `App.js` there with following contents:

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

Here each time we call `openPopup` or `closePopup` we trigger `setState` function that causes re-render with updated `isOpen` value.

Then we pass `isOpen` value to `Popup` component. Create `Popup.js` with the following code:

```html
import React from 'react';

class Popup extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="popup-backdrop">
        <div className="popup">
          <button className="popup-close" onClick={this.props.onClose}>✖</button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Popup;
```

It returns `null` and renders nothing if we pass false, or renders our popup layout if we pass true.

We've also passed `closePopup` as value of `onClosed` prop. And now we trigger it as `onClick` callback of close button.

The `{this.props.children}` part allowed us to pass the nested component `SubscriptionForm` that basically contains opt-in form provided by Mailchimp.

I just changed `inputs` to use closed tag, and changed some attributes to their React versions. Like `class`/`className`, `for`/`htmlFor`.

Here is my `SubscriptionForm`:

```html
import React from 'react';
import PropTypes from 'prop-types';

class SubscriptionForm extends React.Component {
  render() {
    return (
      <div id="mc_embed_signup">
        <form action="https://maksimivanov.us12.list-manage.com/subscribe/post?u=fdcb5a4b4a6cbb9721227a48f&amp;id=fa1a88a0d0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe to my mailing list</h2>
            <div className="mc-field-group">
              <label htmlFor="mce-NAME">Name:
                <input type="text" name="NAME" className="required" id="mce-NAME"/>
              </label>
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email:
                <input type="email" name="EMAIL" className="required email" id="mce-EMAIL"/>
              </label>
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
              <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
            </div>
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_fdcb5a4b4a6cbb9721227a48f_fa1a88a0d0" tabIndex="-1" value=""/></div>
            <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></div>
          </div>
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
```

It is temporal solution, later I plan to switch to [mail-for-good](https://github.com/freeCodeCamp/mail-for-good) that uses AWS to send bulk emails and rewrite that subscription form as well.

## Summary

This is it. We've used `webpack` to build and bundle our javascript. We've added a simple popup component and an opt-in form.

In next article we'll add tests and learn about some tools that we have for testing React applications.

<sign-up-form></sign-up-form>
