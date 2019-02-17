---
title: Js Statements Vs Expressions
date: 2018-04-20T22:58:45.284Z
categories: Javascript
image: statements_expressions.png
comments: true
---

Let's talk about __statements__ and __expressions__. It's very important to understand difference between them.

I've checked several articles on this topic and in a lot of them authors say something like: Ok, we have statements, we have expressions, we can use expressions in place of statements but not in reverse. It is kind of true, but not completely.

It's not like you can apply hammer-wrench 🛠️ analogy. Like __statement__ is a hammer 🔨 and __expression__ is a wrench 🔧. And as like with heavy enough wrench you can use it as a hammer – you can apply __expression__ in place of a __statement__.

No, it's not like that. An expression is always part of statement. Even if that statement only consists of that expression.

## Contents

* [Statements](#statements)
* [Expressions](#expressions)
* [Conclusion](#conclusion)

<a name='statements'></a>
## Statements

When we write programs - we describe the sequences of actions that should be performed to get a desired result. In programming languages those actions are called statements. 
So every _Javascript_ program basically consists of statements. In javascript statements are separated by semicolons.

Important note:

> You can use just newlines and omit semicolons, because Javascipt puts semicolons in the end of lines automatically, but ❌ __this is not recommended__. There are cases where it can lead to ambiguity. See the [automatic semicolon insertion](https://www.ecma-international.org/ecma-262/#sec-automatic-semicolon-insertion) section of ECMAScript specification.

All of those are statements:

```js
let declaredVariable; // variable declaration is a statement
let otherVariable = 0; // even with assignment
function functionCall() { // function declaration is a statement
}
if(true){} // if is statement
2+2; // even this is statement
// Even though it consists from only one expression
```

As you can see statements just do things. They are kind of language _phrases_. They can contain smaller parts, for example expressions.

<a name='expressions'></a>
## Expressions

Simply speaking an __expression__ returns a value:

```js
2+2
true
true && false
functionCall() // whatever the function returns
declaredVariable // whatever the variable value was
declaredVariable = 'new value' // assignment is an expression
```

Actually just `"foo"`, `{foo: 'bar'}`, `[1,2,3]`, or `42` are also expressions, they are called `literals` (string, object, array and number literal) because they just return their literal value.

And even this small expressions can be statements on their own.

```js
2;
```

This is statement. It's useless. It doesn't help, but still. As you can see it consists from only one expression. Statements like this are called `expression statements`.

<a name='conclusion'></a>
## Conclusion

Javascript program consists of statements. They are executed one by one, in the same order as they are written. Statements can contain other constructions like expressions, keywords, operators and other stuff.

Expressions are parts of statements that return values. So expressions can be used whenever value is expected.

Sometimes you can use `expression-statements` instead of usual statements, `if-else` is good example:

```js
let foo;
if (bar === 'bazz') {
  foo = bar;
} else {
  foo = null;
}
```

You can use this `expression` instead:

```js
let foo = bar === 'bazz' ? bar : null
```

That's it, it was short, but I hope it helped to structurize the knowledge.
