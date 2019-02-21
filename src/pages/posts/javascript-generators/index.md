---
title: Javascript Generators
date: 2019-02-19T01:58:45.284Z
categories: Javascript
image: generators.jpg
---

`youtube:https://www.youtube.com/embed/28qwwfZEMdk`

ES6 brought a bunch of new functions to deal with asynchronous data streams. Generator functions and async/await syntax among them.

Generators are special kind of function that can be paused and then resumed.

## Declaring Generator Function

Generators are defined using `function` keyword with asterisk `*`:

```js
function* generator() {
  // This is generator function
}
```

Inside generator function you can use new keyword `yield`. It works kind of like `return` but instead of stopping function completely it pauses it so you can continue execution from that place later.

```js
function* generator() {
  console.log("This will output first.");
  yield;
  console.log("This will output only after you resume.");
}
```

## Controlling Generator Function

Calling generator function doesn't execute it's body immediately. Instead it returns an iterator, an object that contains method `next()`. Every time you'll call this method it will unpause the generator function so it will be executed until next `yield` or `return` keyword.

```js
function* generator() {
  return "Hey!";
}

const iterator = generator();

console.log(iterator.next()); // {value: "Hey!", done: true}
```

Every time you call `next()` on your **iterator** it will return and object with `value` and `done` fields. `value` will contain what you pass to your yield or return, and `done` signifies if function finished execution.

```js
function* sampleGenerator() {
  yield "Just paused.";
  return "Now stopped.";
}

const iterator = sampleGenerator();

console.log(iterator.next()); // {value: "Just paused.", done: false}
console.log(iterator.next()); // {value: "Now stopped.", done: true}
```

## Passing Data To Generator Function

You can also pass data back to your generator function.

To do this just call `next()` method of your iterator with an argument.

```js
function* sampleGenerator() {
  const time = yield "Hey, what time is it?";
  return `It's ${time} o'clock.`;
}

const iterator = sampleGenerator();

console.log(iterator.next()); // {value: "Hey, what time is it?", done: false}
console.log(iterator.next("16:20")); // {value: "It's 16:20 o'clock.", done: true}
```
