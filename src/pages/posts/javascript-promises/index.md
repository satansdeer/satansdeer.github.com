---
title: Promises In Javascript
date: 2019-04-14T01:58:45.284Z
categories: Javascript
image: react_dev_tools.jpg
---

`youtube:https://www.youtube.com/embed/3R9Yekajvl8`

In Javascript Promises are special sort of objects that serve as a proxy for data that is initially unknown.

The concept is not unique for Javascript, similar constructs exist in other languages as well.

They exist in Java, Python, Lisp, C++ and other languages and depending on language are known there by different names, like **futures**, **deferreds**, **delays** and other.

> The term **Promise** was proposed in 1976 by Daniel P. Friedman and David Wise in paper called "The Impact of Applicative Programming on Multiprocessing."

Promises are used to process results of asynchronous operations.

## Convert Callback to Promise

Let's say we have some code that uses callback to perform an operation asynchronously:

```js
setTimeout(() => {
  console.log("Async operation.");
}, 1000);
```

We can remake it to use **Promise**.

```js
const promiseSetTimeout = ms => new Promise(resolve => setTimeout(resolve, ms));

promiseSetTimeout(1000).then(() => console.log("Async operation"));
```

Here we used method `then` of the **Promise** instance to perform operation after the **Promise** was resolved.

Coolest part here is that since **ES6** you can use `async/await` syntax to handle promises.

```js
const promiseSetTimeout = ms => new Promise(resolve => setTimeout(resolve, ms));

await promiseSetTimeout(1000)
console.log("Async operation");
// Will be executed after 1000 ms delay
```

## Promise Object

Essentially **Promises** can be in three different states:

* Pending - initial state of any **Promise**
* Resolved - when operation was performed successfully
* Rejected - when operation failed

**Promises** can't change state arbitary. After some **Promise** was resolved or rejected it can't become **Pending** again.

When instantiated **Promise** accepts an `executor` function.

> Executor function is executed immediately after **Promise** is instantiated.

```js
const promise = new Promise(executor);
```

This function accepts two callbacks `resolve` and `reject`.

```js
const promise = new Promise((resolve, reject) => {
  // Some asynchronous code
});
```

If the asynchronous operation was performed successfully you should call `resolve`.

```js
const promise = new Promise((resolve, reject) => {
  resolve("Async success!");
});
```

After calling `resolve` inside `executor` **Promise** will change state to **resolved**.

**Promise** provides method `then` to get result of successful execution.

```js
promise.then(result => console.log(result));
```

You can also call `reject` inside `executor`.

```js
const promise = new Promise((resolve, reject) => {
  reject("Async failed!");
});
```

In this case **Promise** will become **rejected**.

**Promise** provides method `catch` to handle rejection.

```js
promise.catch(result => console.log(result));
```

**Promise** instance also provides method `finally` that will be called regardless whether it was fulfilled or rejected.

```js
promise.finally(result => console.log(result));
```

## Chaining Promises

As methods `then` and `catch` return promises - they can be chained.

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then(result => {
    console.log(result); // 1
    return result + 1;
  })
  .then(result => {
    console.log(result); // 2
    return result + 1;
  })
  .then(result => {
    console.log(result); // 3
    return result + 1;
  });
```

In this example every call to `then` returns a new **Promise**. So next call to `then` is performed on this returned **Promise**. So each callback is executed sequentially, after previous **Promise** is resolved.

We can also add multiple `then` callbacks to single promise. In this case they won't be chained.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

promise.then(result => {
  console.log(result); // 1
  return result + 1;
});

promise.then(result => {
  console.log(result); // 1
  return result + 1;
});

promise.then(result => {
  console.log(result); // 1
  return result + 1;
});
```

In this example all calls to `then` are performed on original **Promise** so they are performed independently.

## Promise Static Methods

**Promise** also provides static methods.

### Promise.resolve

Returns resolved promise with given value:

```js
const resolvedPromise = Promise.resolve("Success");
```

This method is used when you need to wrap an already known value into a promise.

### Promise.reject

Returns rejected promise with an error:

```js
const rejectedPromise = Promise.reject("Failure");
```

### Promise.all

Accepts an iterable container of promises (usually an array) and returns a new promise that resolves when all promises in container resolve.

The resolved promise will contain an array of results of passed promises.

```js
const allPromises = Promise.all([promise1, promise2, promise3]);
```

The resolved values will keep the order in which their promises were passed to `Promise.all`:

```js
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
]).then(console.log); // [1,2,3]
```

Here even though first promise has the longest delay and will be resolved last, its result will still be the first in the array of values.

### Promise.race

Takes an iterable container of promises (usually an array) and returns a new promise that resolves when the first promise in this container resolves.

`Promise.race` will resolve with first resolved promise value.

```js
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
]).then(console.log); // 3
```

