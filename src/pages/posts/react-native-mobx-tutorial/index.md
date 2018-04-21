---
title: React Native Mobx Tutorial - Part 1
date: 2018-01-01T22:58:45.284Z
categories: js react mobx
image: react_native_mobx_1_thumb.jpg
---

__Mobx__ is state management solution that is gaining popularity very fast. I'll show you
how to create a simple __React-Native__ app using __Mobx__.

## What Are We Going To Build

I have a few crypto coins on some exchanges. Not like I'm trading or something, I just bought some tokens that I liked and now just hold them and buy/sell ocasionally.

On [Binance](https://www.binance.com/?ref=12930619) you can see how many coins you have and what's their worth in bitcoin and even in dollars, but you can't see what's the difference since the last time you've checked it.

We are going to build portfolio tracker for it. On first run we'll save all the coins prices and then we'll show the difference.

It'l look somewhat like this:

![binance tracker](/binance_tracker.png)

We'll learn how to store data locally, use flatlist, navigator and do multi-screen applications, also we'll learn how to manage state using mobx.

## Table Of Contents

1. [What is MobX](#)
2. [Making ReactNative app](/posts/react-native-mobx-tutorial-part-2)
2. [Testing stores](#)
2. [Testing views with Enzyme](#)

## Why Mobx?

MobX is usually faster than Redux, requires less boilerplate and in general it's easier to grasp for novice.

Mobx has very few core concepts:

* [Observables](#observables)
* [Computed values](#computed_values)
* [Reactions](#reactions)
* [Actions](#actions)

### <a name='observables'></a>Observables

Observables allow you to subscribe for their changes. You can annotate your class properties with `@observable` decorator and then track their values with `observers`. So every time the values will change – `observers` will be updated accordingly.

Here is simple example. It's a rolling dice – every time you press __ROLL__ button – it re-rolls the dice and displays resulting number from 1 to 6.

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer class Dice extends Component {
  @observable value = 1;

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.result}>Result: {this.value}</div>
        <button onClick={this.handleRoll}>ROLL</button>
      </div>
    )
  }

  handleRoll = () => {
    this.value = Math.floor(Math.random()*6) + 1;
  }

  styles = {
    container: {
      padding: '16px 0px'
    },
    result: {
      fontSize: 22,
      marginBottom: 10
    }
  }
}
ReactDOM.render(<Dice />, document.getElementById('dice'));
```
<p>
  <div id="dice"></div>
  <script type="text/javascript" src="/javascripts/dice.js" charset="utf-8"></script>
</p>

### <a name='computed_values'></a>Computed values

Computed values can be derived from observables and will be updated automatically when the latter will be changed. Keep in mind, that in order to be updated `computed` has to be observed.

```jsx
@computed get computedValue() {
  return this.value > 3 ? 'WIN' : 'LOOSE'
}

render() {
  return (
    <div style={this.styles.container}>
      <div style={this.styles.result}>Result: {this.value}</div>
      <div style={this.styles.result}>Computed Result: {this.computedValue}</div>
      <button onClick={this.handleRoll}>ROLL</button>
    </div>
  )
}
```

<p>
  <div id="computed_dice"></div>
  <script type="text/javascript" src="/javascripts/computed_dice.js" charset="utf-8"></script>
</p>

### <a name='reactions'></a>Reactions

Reactions are very similar to computed values but instead of returning new value they are used to produce side-effects (making network requests, patching dom e.t.c)

Mobx provides 3 types of reaction functions [when](https://mobx.js.org/refguide/when.html), [autorun](https://mobx.js.org/refguide/autorun.html) and [reaction](https://mobx.js.org/refguide/reaction.html)

* `when` accepts two functions: predicate and effect. It runs and observes predicate until it returns `true`, and then runs the `effect` function. After thet it disposes, and stops reacting observed property.
* `autorun` is for cases when you need reactive function that will fire every time the observed value is updated. Unlike `computed` it doesn't have to be observed itself.
* `reaction` is like `autorun` but gives you more control over what properties to observe. It accepts two functions `data-function` and `side-effect-function`. `data-function` is tracked and returns data that is used in `side-effect-function`.

Here is an example of `autorun`:

```html
constructor() {
  super();
  autorun(
    ()=> (this.value > 3) && alert('WIN')
  )
}
```

<p>
  <div id="reaction_dice"></div>
  <script type="text/javascript" src="/javascripts/reaction_dice.js" charset="utf-8"></script>
</p>

### <a name='actions'></a>Actions

Actions are anything that alters the state. So you can use them to explicitly mark that functions with `@action` decorator.

This decorator takes function and wraps it into `transaction`, `untracked` and `allowStateChanges`.

* `transaction` is used to batch state updates so no observers will be notified until that function is completed. So you can update multiple properties at once.
* `untracked` allows you to run code without establishing observers (just like reactions, or unlike computed's)
* `allowStateChanges` is used to allow/disallow state changes for certain function. By default allows `action` to make changes (and disallows for `computed` and `observer`).

## Observers

Strictly speaking `observers` aren't part of mobx core. They are provided by the `mobx-react` package. But anyway…

They are used to make your views "observe" `observables` and re-render on change.

But I'll cover it in next part.

<sign-up-form></sign-up-form>
