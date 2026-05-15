---
title: Pure Functions And Side Effects
date: 2019-03-10T02:08:45.284Z
categories: Programming
image: thumb.jpg
---

In computer programming **pure function** is a function that satisfies two conditions:

* It is **deterministic**, which means that for any given input it will always return same output.
* It has no **side effects**. Which means it doesn't change outside world. Doesn't perform input/output operation or change global variables.

The most simple example of pure function is an **identity** function:

```js
const identity = (x) => x;
```

For any given `x` it will return its value, so it is **determenistic**.

It also has to **side-effects** as it doesn't interact with global environment.

More practical example of pure function could be `sum` that will return sum of its arguments:

```js
const sum = (x, y) => x + y;
```

This function is pure as well. For any given `x` and `y` it will always return same result.

Contrary to that `Math.random()` is an example of **nondeterministic function**.

Every time you call it - you can get different result.


```js
Math.random();  // 0.30498094536268224
Math.random();  // 0.30387681124534656
Math.random();  // 0.03712550164644983
```

Any function that will use result of `Math.random()` execution inside of it will also become **nondeterministic** and **impure**.

Another example of an **impure** function is function with **side effects**.

```js
let x = 0;

const increment = () => {
  x = x + 1;
  return x;
}

increment() // 1
increment() // 2
increment() // 3
increment() // 4
```

Here function `increment` is **impure** because it alters the global variable `x`.

Every time you will call it you will get different result.

## Benefits Of Pure Functions

**Pure functions** have a bunch of benefits over **impure** ones.

First of all **pure functions** are easier to read. Pure functions tend to be small and do one thing.

**Pure functions** are easier to test. Since there are no side effects and the output depends only on the input, your test cases are straightforward.

**Pure functions** are very composable. In functional programming it is very common to compose small pure functions into more complex ones.

```js
const add = (a, b) => a + b;
const mult = (a, b) => a * b;
add(2, mult(3, 5))
// 17
```

Here we passed the result of `mult` as a second argument of our `add` function.

**Pure functions** are memoizable. That means that you can save result of your function execution to use it later.