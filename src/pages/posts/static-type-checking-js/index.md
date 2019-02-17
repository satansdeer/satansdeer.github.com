---
title: Do You Need Static Type Checking?
date: 2018-04-08T05:58:45.284Z
categories: Javascript
image: static_type_checking.jpg
comments: true
---

We'll talk about types and static type checking in javascript. Why you might want it and how to apply it.

## WAT? Javascript Has No Types

![WAT](https://media.giphy.com/media/jA8TT03Sj2pXO/giphy.gif)

Well, maybe I went a bit extreme. Let me explain myself.

If you will search the internet for Javascript type system – you'll find several definitions:

### Javascript is

  *   Dynamic
  *   Weakly typed
  *   Loosely typed
  *   Untyped
  *   Unityped

Those definitions can be grouped into two categories:

### Practical Definition

  *   Dynamic
  *   Weakly typed
  *   Loosely typed

First three definitions are the most common. And they describe the language from the practical point of view. Dynamic means that data types are bound to values and types are checked at run time.

Weak/loose typing is more value, but most often it describes the fact that Javascript coerces types automatically.

So Javascript allows you to do all kinds of crazy stuff with your values:

## Unityped/Untyped

This notion is more common in academic circles.

Here I'll refer to the definition of Benjamin Pierce book "Types and Programming Languages" where he gives the following definition of the type system.

> A type system is a tractable syntactic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute.

Ok, I hope that I look smart now 🤓.

And basically, this phrase means that type system allows to check the syntax of the program and mark some phrases invalid if kinds of values it computes don't align.

The fact that we can tell it just by the syntax – means that we do it statically, not at runtime.

In javascript there is no way to say that some values won't align, all of that expressions are valid:

```js
[] + 1
2 + ""
true - 1
```

This is what I meant by saying that Javascript has no types.

From practical perspective it has types, but it has them only at runtime, and even at runtime it implicitly coerces them.

## Small Conclusion

Javascript is dynamic, does all type checks at runtime, and even then tries to coerce types implicitly, so you wouldn't have to worry about it.
You can write syntactically correct programs where you'll perform operations on incompatible things and you'll know this only at runtime.

Now let's discuss why you might want to add static type checking.

## WHY, Do we need static type checking?

### The problem of complexity

Programming is hard. And the longer you develop some program – the harder it becomes.

Probably everyone has noticed that __it's always easier to develop new projects__ than support old ones. That's because of complexity that tends to grow pretty fast as we add new features to the program.

### Separating by units

So we break our programs into smaller parts. It can be functions, modules, classes. Doesn't matter as long as we break our big project into smaller chunks.

And then we cover those smaller parts with tests. This is great, now we can make sure that our units work as intended. We have delightful islands of control in our sea of entropy.

But there still are parts that we can't cover with unit tests.

### Spaces in between

Those are spaces in between. The spaces where our units interact with each other.

How do we test those? Well, the most obvious solution would be to take those units that have to work together and test them in integration. But this is unsustainable, and you'll never be able to tell if you covered all the use cases. And the more modules and their combinations you have – the more prominent this problem becomes.

Another way to ensure that your units will work together – is by defining contracts, and then enforcing them. 

And here is where Javascript dynamic nature doesn't help us at all. You can pass any values to your functions – and you'll be able to catch errors only at runtime.

![javascript dynamic nature](/brokula-pica-i-pas.gif)

In React world there is a very popular way to do it – the PropTypes. But it's a runtime check, so you might see some errors late and also it's applicable only to react components.

There is a better solution. We can add static type checking to Javascript. For example with Flow.

## Flow

Flow is a static type checker made by Facebook. It's pretty easy to start using. Just install the `npm` package:

```js
yarn add --dev flow-bin
```

Run `yarn run flow init` and then just run `yarn run flow` to check your project for type errors.

I recommend using comments for flow type annotations. Flow has it's own comments syntax, to use it add a double colon in the beginning of the comments block.

```js
/*::
type Foo = {
  foo: number,
  bar: boolean,
  baz: string
};
*/

class MyClass {
  /*:: prop: string; */
}
```

You can also use `flow-include` instead of double colon:

```js
/*flow-include
type Foo = {
  foo: number,
  bar: boolean,
  baz: string
};
*/

class MyClass {
  /*flow-include prop: string; */
}
```

And here is what it allows you to do.

### Catch errors early

You can add flow support to your editor and get hints as you develop. It has plugins for most popular editors:

* Atom
* Sublime Text
* Vim
* Emacs
* Visual Studio Code
* WebStorm 

It will be much easier to refactor your code. Now you'll instantly know that you've changed the contract of your unit – and you'll be able to fix it faster.

### Inferring Types

Flow will infer types. What does it mean? Some good news, you don't need to always write type annotations. Where possible – flow will try to infer types automatically.

Here is an example:

```js
// @flow
function concat(a, b) {
  return a + b;
}

concat("foo", "bar"); // Works!
// $ExpectError
concat(true, false);  // Error!
```

### Literal, Union, Intersection, Interface

Now you can be very specific with kinds of values your functions accept. You can limit it to nominal types, literals, or even structural types, using interfaces.

Actually, I was lacking interfaces in javascript for a long time. Now you can the define some interface and ensure that only objects that conform to it (have all required methods and properties) will be accepted in some function.

Also you can list allowed values for your function. `function getColor(name: "success" | "warning" | "danger")`.

It's a lot more powerful than what `PropTypes` can provide.

## Conclusion And My Thoughts

Static type checking is a very powerful instrument. It allows preventing bugs by defining clear contracts for your units of code. It adds some noise when you read and you have to type (pun intended) a bit more. 

In this article, I used Flow as an example of static type checking tool. There are others, you can use TypeScript, Elm, ReasonML e.t.c.

My main point is that static type checking will help you to ensure that your modules conform the contract and that you use them properly. If you have poor architecture, or your modules are not covered by unit tests – static type checking won't help you.

## Free React Course

I've released a `WIP` version of my [React Course](https://basicreact.com), check it out.

I really want to make it useful, so join the [Slack Channel](https://join.slack.com/t/frontendartisans/shared_invite/enQtMzM1MjM3ODYyMDY1LWUwYzM4ZDc5ZDU1MjY1ZWM2OWZmNWUzZmZlNGJhOGRiYzA1ZmFiZDBkZDg2YmI3MzMyNTcxODVhZjgzMjNiZjc) and let me know what you'd like to see in __your perfect react course__.
