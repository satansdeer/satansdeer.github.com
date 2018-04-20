---
title: Js Statements Vs Expressions
date: 2018-04-20T22:58:45.284Z
categories: js
image: statements_expressions.png
comments: true
---

Let's talk about __statements__ and __expressions__. It's very important to understand difference between them.

## Contents

* [Overview](#overview)
* [Expressions](#expressions)
* [Statements](#statements)
* [Expression statements](#expression_statements)

<a name='overview'></a>
## Overview

When we write programs - we describe the sequences of actions that should be performed to get a desired result. 

Simply speaking an __expression__ produces a value:

```js
2+2
true
true && false
functionCall() // whatever the function returns
declaredVariable // whatever the variable value was
declaredVariable = 'new value' // assignment is an expression
```

Statement performs an action:

```js
let declaredVariable; // variable declaration is a statement
let otherVariable = 0; // even with assignment
function functionCall() { // function declaration is a statement
}
if(true){} // if is statement
```

Important thing to note:

> Javascript expressions can be used in place of statements (so-called _expression statements_). But it doesn't apply in reverse.

Here is an analogy, I call it a hammer-wrench 🛠️ analogy.

Imagine that __expression__ is a hammer 🔨 (because you can __express__ your anger by breaking stuff with it). Then wrench 🔧 will be a __statement__ (because of unknown reasons). So you can hammer the nails with hammer and to some extent with wrench, but hammer will never work as a wrench.

<a name='expressions'></a>
## Expressions

As I already mentioned - expressions always return value.

<a name='statements'></a>
## Statements

<a name='expression_statements'></a>
## Expression Statements
