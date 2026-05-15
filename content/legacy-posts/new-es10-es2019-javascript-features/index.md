---
title: What's New in ES10? Javascript Features ES2019
date: 2019-02-16T04:58:45.284Z
categories: Javascript
image: new_javascript_features.jpg
---

It is 2019, and there is a bunch of new features that got approved by the **TC39** consortium and soon will become part of ES10 standard.

## Array.flat

First thing we're gonna look at is `Array.flat` method.

What it does is it **flattens** the array by given depth.

If you used **Lodash** or **Underscore** - you are already familiar with this method. There it is called `flatten` or `flattenDepth`.

Let's look at an example.

```js
const fruits = [["🍋", "🍌"], ["🍎", "🍏"], ["🍐", "🍑"]];

const flatFruits = friuts.flat(); // Default flat level is 1

console.log(flatFruits);
// ["🍋", "🍌", "🍎", "🍏", "🍐", "🍑"];
```

I think it's great that we've got this method, so now we don't have to use
external libraries or white our own wordy solutions for this simple task.

## Array.flatMap

Moving on, another thing you can do with arrays now is that you can call the
`flatMap` method on them.

As you can guess by it's name this method combines `flat` and `map` methods and allows you to map through the array of items and then flatten the result in one go.

```js
const fruits = ["🍋", "🍌", "🍎", "🍏", "🍐", "🍑"];
const fruitNames = [
  "Lemon",
  "Banana",
  "Red Apple",
  "Green Apple",
  "Pear",
  "Peach"
];

const mappedExample = fruits.map((fruit, index) => [fruit, fruitNames[index]]);
console.log(mappedExample);
// [
//   ["🍋", "Lemon"],
//   ["🍌", "Banana"],
//   ["🍎", "Red Apple"],
//   ["🍏", "Green Apple"],
//   ["🍐", "Pear"],
//   ["🍑", "Peach"],
// ];

const mappedAndFlattenedExample = fruits.flatMap((fruit, index) => [
  fruit,
  fruitNames[index]
]);

console.log(mappedAndFlattened);
// [ "🍋",
//   "Lemon",
//   "🍌",
//   "Banana",
//   "🍎",
//   "Red Apple",
//   "🍏",
//   "Green Apple",
//   "🍐",
//   "Pear",
//   "🍑",
//   "Peach",
// ];
```

Here we have an array of fruits from previous example, let's provide a second array with those fruits names.

Now let's say that we want to combine those arrays so after each fruit emoji we'll have this fruit name.

To do this we map through the fruits array with index and for each fruit we return an array combining fruit and fruit name with same index.

If we log it we'll see that we got a two dimensional array of fruits and their names.

Let's change `map` to `flatMap` - now we get a regular one dimensional array of fruits with their names.

## String.trimStart/trimEnd

String prototype also got some updates, now we can trim whitespaces from beginning or end of our string using trimLeft / trimRight methods:

```js
const untrimmedString = "     Trim me 😢    ";

console.log(untrimmedString.trimLeft());
// "Trim me 😢    ";

console.log(untrimmedString.trimRight());
// "     Trim me 😢";
```

Here we have an untrimmed string with a bunch of whitespaces in the beginning and end. We can easily trim either of them using `trimLeft` or `trimRight` methods.

## Object.fromEntries

Object now has `fromEntries` method. Now you can take an array of entries:

```js
const fruitEntries = [
  ["🍋", "Lemon"],
  ["🍌", "Banana"],
  ["🍎", "Red Apple"],
  ["🍏", "Green Apple"],
  ["🍐", "Pear"],
  ["🍑", "Peach"]
];

const fruitsObject = Object.fromEntries(fruitEntries);

console.log(fruitsObject);
// {
//   "🍋": "Lemon",
//   "🍌": "Banana",
//   "🍎": "Red Apple",
//   "🍏": "Green Apple",
//   "🍐": "Pear",
//   "🍑": "Peach"
// };
```

And create an object from it. Previously we had only the `Object.entries` which would take and object and return an array of `[key, value]` pairs.

## Optional Catch Binding

Next goes ability to not bind the parameter to the catch clause:

```js
try {
  throw "Error we don't care about";
} catch (error) {
  // Some handling logic
}
```

So if you don't need that `error` parameter you can just omit it.

```js
try {
  throw "Error we don't care about";
} catch {
  // Some handling logic
}
```

I have to note that it's quite controversial, and you might want to read an extensive [article by Axel Rauschmayer](http://2ality.com/2017/08/optional-catch-binding.html) where he talks about implications of this method and some alternatives.

It's a good read - so check it out.

## Function toString Revision

Function `toString` method was reviewed. In **ES6** when `toString` was invoked on a function it would return string representation of that function
depending on ECMAScript engine.

When possible it would return the source code, otherwise - a standardized placeholder. So if `toString` couldn't create syntactically valid Javascript code, it would return a string for which `eval` throws a SyntaxError. It was a requirement so that `eval` couldn't parse this string.

Problem with that was that you could never be 100% sure that a future version of ECMAScript won't make it syntactically valid.

New proposal standardizes the placeholder: a function with body `{ [native code] }`.

Let's look at examples:

For functions defined with Javascript code `toString` will return their original source code:

```js
function exampleFuncton() {
  // Hello, I'm an ordinary function
}

console.log(exampleFunction.toString());
// function exampleFunction() {
//     // Hello, I'm an ordinary function
// }
```

Built-in function objects, bound function exotic objects and callable objects not defined in Javascript code will return a `NativeFunction` string:

```js
console.log(isNaN.toString());
// function isNaN() { [native code] }

console.log(Math.pow.toString());
// function pow() { [native code] }

console.log(function foo() {}.bind(null).toString());
// function () { [native code] }
```

If a function is a [well-known intrinsic object][https://tc39.github.io/ecma262/#sec-well-known-intrinsic-objects] (`Array`, `Error`, `isNan`, etc) then the initial value of its name will appear in the result.

## Symbol Description Accessor

Update for symbols!

When you create a symbol you can provide a string as a description:

```js
const symbolExample = Symbol("Symbol description");
```

Previously you would have to call `toString` on it to get the description:

```js
const symbolExample = Symbol("Symbol description");
console.log(symbolExample.toString());
// 'Symbol(Symbol description)'
```

Now we have a getter to access `Symbol` description:

```js
const symbolExample = Symbol("Symbol description");
console.log(symbolExample.desc());
// Symbol description
```

Looks much cleaner, right?

## How To Track New Js Features

Now as I've promised you in the beginning - how to keep up to date with new Javascript features.

Track the **TC39** [proposals repository](https://github.com/tc39/proposals). **TC39** is a committee that evolves Javascript.

In that repo you'll find documents describing proposals on 4 stages:

* Stage 0 - Strawman
  Those are either yet to be presented to the committee or presented but not yet achieved criteria to get into stage 1. Strawman proposals don't have any criteria.
* Stage 1 - Proposal
  This is a stage when proposal stops being a strawman and starts to shape as something that might potentially become a Javascript feature. It needs to have some illustrative examples, and high-level API described. At this point proposal should have a "champion" assigned to it who will advance it's addition to standard.
* Stage 2 - Draft
  Proposals at this stage should also get an initial spec text.
* Stage 3 - Candidate
  Spec text should be completed, reviewed and approved.
* Stage 4 - Finished
  If the proposal gets to this stage it means that it will be included in next edition of the formal ECMAScript standard.

Now just check out this repo from time to time, read the proposals and be on the bleeding edge of Javascript.

`youtube:https://www.youtube.com/embed/8Ie7hHxVbA8`
