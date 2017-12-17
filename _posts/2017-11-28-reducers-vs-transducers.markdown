---
layout: post
title:  "Reducers VS Transducers"
date:   2017-11-28 22:58:45 +0300
categories: js functional
image: reducers_vs_transducers.jpg
---

Sweet chunk of functional paradigm for you today. I don't know why did I write "versus" while they compliment each other. Anyway, let's get to the good&nbsp;stuff…

## Reducers

Simply speaking a `Reducer` is a function that takes an accumulation and a value, and then returns a new accumulation.

![reducers](/assets/images/reducers_vs_transducers_1.png)

You are already familiar with reducers if you've used the `Array.prototype.reduce()` method. The `.reduce()` function itself is not a reducer!
It iterates over a collection and passes values to it's "callback" that is a __reducer__ here.

Let's imagine that we have an array with five numbers: `[1, 2, 3, 14, 21]` and we want to find the biggest of them.

```javascript
const numbers = [1, 2, 3, 14, 21];

const biggestNumber = numbers.reduce(
  (accumulator, value) => Math.max(accumulator, value)
);

// 21
```

The arrow function here is a reducer. The `.reduce()` method only takes the result of previous reduction and calls the reducer with it and next element of an array.

Reducers can work with any kinds of values. The only rule is that the accumulation you return should have the same type that the accumulation you pass in.

For example you can easily create a reducer that will work with strings:

```javascript
const folders = ['usr', 'var', 'bin'];

const path = folders.reduce(
  (accumulator, value) => `${accumulator}/${value}`
, ''); // Here I passed empty string as an initial value

// /usr/var/bin
```

Actually it's better to illustrate without `Array.reduce()` method. Look:


```javascript
const stringReducer = (accumulator, value) => `${accumulator} ${value}`

const helloWorld = stringReducer("Hello", "world!")

// Hello world!
```

## Map And Filter As Reducers

The other cool thing about reducers is that you can chain them to perform a series of operations on some data. This opens up huge possibilities for composition and reuse of small reducer functions.

Let's say you have an ordered array of numbers. You want to get even numbers from it and then multiply by 2.

The ordinary way to do it would be to use `.map` and `.filter` functions:

```javascript
[1, 2, 3, 4, 5, 6]
  .filter((x) => x % 2 === 0)
  .map((x) => x * 2)
```

But what if your array had 1000,000 elements? You have to loop through the whole array for every operation, that's extremely uneffective.

We need some way to combine the functions we passed to `map` and `filter`. But we can't do this as they have different interface. The function
that we passed to `filter` is called __predicate__ and it takes a value and returns __True__ or __False__ depending on inner logic. And the function
we passed to `map` is __transformer__ function. It takes a value and returns __transformed value__.

We can achieve this with reducers, let's create our own __reducer__ version of `.map` and `.filter` functions.

```javascript
const filter = (predicate) => {
  return (accumulator, value) => {
    if(predicate(value)){
      accumulator.push(value);
    }
    return accumulator;
  }
}

const map = (transformer) => {
  return (accumulator, value) => {
    accumulator.push(transformer(value));
    return accumulator;
  }
}
```

Great, we used __decorator__ functions to wrap our reducers. Now we have `map` and `filter` functions that return __reducers__ that can be passed to `Array.reduce()` method!

```javascript
[1, 2, 3, 4, 5, 6]
  .reduce(filter((x) => x % 2 === 0))
  .reduce(map((x) => x * 2))
```

Great, now we have a chain of `.reduce` function calls, but we still can't compose our reducers! Good news is there is only one step left. To be able to compose reducers we need to be able to pass them to each other.

## Transducers FTW

Let's update our `filter` function so it would also accept __reducer__ as an argument. We are going to decompose it and instead of pushing value to __accumulator__ we'll allow
the passed in __reducer__ to perform it's logic.

```javascript
const filter = (predicate) => (reducer) => {
  return (accumulator, value) => {
    if(predicate(value)){
      return reducer(accumulator, value);
    }
    return accumulator;
  }
}
```

This pattern where we take a __reducer__ as an argument and return another __reducer__ is called __transducer__. As it's a combination of __transformer__ and __reducer__ (we take a reducer and transform it).

```javascript
const transducer => (reducer) => {
  return (accumulator, value) => {
    // Some logic involving passed in reducer
  }
}
```

So basically transducer looks like this `(oneReducer) => anotherReducer`.

Now we can combine our __mapping__ reducer and __filtering__ transducer and do our calculations in one run.

```javascript
const evenPredicate = (x) => x % 2 === 0;
const doubleTransformer = (x) = x * 2;

const filterEven = filter(evenPredicate);
const mapDouble = map(doubleTransformer);

[1, 2, 3, 4, 5, 6]
  .reduce(filterEven(mapDouble));
```

Actually we could make our map method a transducer as well and continue this composition indefinitely.

But just imagine having to compose more than 2 transducers. We have to find more convenient way to compose them.

## Better Composition

Basically we need something that would take a number of functions and compose them in that order.

```javascript
compose(fn1, fn2, fn3)(x) => fn1(fn2(fn3(x)))
```

Luckily a lot of libraries provide this kind of function. For instance [RamdaJS](http://ramdajs.com/docs/#compose). But for educational purposes let's create our own version.

```javascript
const compose = (...functions) =>
  functions.reduce((accumulation, fn) =>
    (...args) => accumulation(fn(args)), x => x)
```

The function is very compact, let's break it down.

Imagine that we called that function like this `compose(fn1, fn2, fn3)(x)`.

First look at the `x => x` part. In lambda calculus it's called __identity function__. It just returns whatever it takes as an argument without changing. We need it here to start our unfolding.

So after fist iteration we'll have that __identity function__ (for convenience let's call it __I__) called with the __fn1__ function as an argument:

```javascript
  (...args) => accumulation(fn(args))

  // STEP 1
  // We pass our fn1 to accumulation
  (...args) => accumulation(fn1(args))

  // STEP 2
  // Here we basically substitute accumulation with I
  // and fn and fn1
  (...args) => I(fn1(args))
```

Yay, we calculated the `accumulation` value after the first iteration. Let's do the second one:

```javascript
  (...args) => I(fn1(args)) // Our new accumulation

  // STEP 3
  // Now we pass fn2 to our accumulation
  (...args) => accumulation(fn2(args))

  // Step 4
  // Lets substitute "accumulation" with it's current value
  (...args) => I(fn1(fn2(args)))
```

I think you got the idea. Now just repeat steps 3 and 4 for `fn3` and voila, you've converted your `compose(fn1, fn2, fn3)(x)` to `fn1(fn2(fn3(x)))`.

Now we can compose our `map` and `filter` like this:

```javascript
[1, 2, 3, 4, 5, 6]
  .reduce(filterEven,
          mapDouble);
```

## Conclusion

I suppose you already knew about __reducers__, and if not – you've learned a nice abstraction to work with collections. Reducers are great to fold different data structures.

Also you've learned how to do your computations effectively using __transducers__.
