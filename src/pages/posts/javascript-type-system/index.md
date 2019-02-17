---
title: Surviving The Javascript Type System
date: 2018-03-12T04:58:45.284Z
categories: Javascript
image: js_types.jpg
---

_"Everything is crooked. Reality is poison. I want to go back, I hate this. I can’t live like this."_ - Morty from the Morty's Mindblowers episode. Also me after investigating about Javascript type system.

## What Type System Does Javascript Have?

If you search internets about javascript and its type system - you'll find that there is some controversy. Javascript type system is often being referred as

* Dynamic
* Weakly typed
* Loosely typed
* Untyped 
* Unityped

Let's figure out what do those terms mean

### Javascript Is Dynamic

__Dynamic__ means that __value__'s type is enforced, but __variable__'s is not, and it can represent any __value__ at given time.

```js
let foo = "bar";
foo = 11;
foo = true;
```

This Javascript code is correct and will execute with no problems.

__Attention!__ The fact that this code is valid doesn't mean you should do this! Do not assign values of different types to the same variable. It is super misleading and you'll make your fellow developers super unhappy.

<img src="https://media.giphy.com/media/YUHv0T4rroNkR78cmQ/giphy.gif" style="max-width: 300px"/>

Also, use `const`. Not only it will make it easier to understand which things you are not going to mutate – it will also give a bit of performance advantage because Javascript doesn't have to track type changes for this thing.

### Javascript Is Weakly/Loosely Typed

__Weakly/Loosely typed__ usually means that Javascript doesn't require you to specify the kind of information will be stored in a variable in advance. And that you can assign different types of data to one variable.

Also, Javascript will try to resolve the type of a variable at run-time and will allow you to make operations with non-matching types by automatically doing type-coercion for you.

```js
const strValue = "test"
const intValue = 2
const result = strValue + intValue // test2
```

It can lead to a lot of weird behavior (I think everyone has already seen the WAT talk). We'll get back to it later.

### Javascript Is Unityped/Untyped

But how can Javascript be __unityped__ or even __untyped__ language if we know that it has 7 basic types (according to ECMAScript specification)?

These definitions are more common in academic circles and both mean that _everything belongs to a single type._

As we are discussing __Javascript type system__ – let's define what does type system mean.

Here is definition from Benjamin Pierce book [Types and Programming Languages](http://www.cis.upenn.edu/~bcpierce/tapl/index.html)

> A type system is a tractable syntactic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute.

Syntactic means that it is a language feature. And it basically means that a language will only generate a program when it can prove that the types align.

So in a typed language, a program might not be generated, because types might not match up because a program can contain multiple types.

Opposed to that, Javascript program will be generated regardless of kinds of data you do the computations on. For Javascript types always match up, which means that actually there is only one type.

Here we need to make a note about types and classes. Both are data structuring mechanisms that describe things with certain structure and behavior.

The difference is that types are being mostly used at compile time to ensure program correctness. And Javascript doesn't have the compilation stage or static check stage by default. What Javascript does at runtime can be categorized as classification and has nothing to do with language syntax.

Here are two articles about types/classes, dynamic/static languages

* [Dynamic Languages are Static Languages](https://existentialtype.wordpress.com/2011/03/19/dynamic-languages-are-static-languages/)
* [Types and classes](https://www.cs.cmu.edu/~clamen/OODBMS/Manifesto/htManifesto/node6.html)

See you in next article where we'll discuss what are the consequences of Javascript being __so dynamic__.
