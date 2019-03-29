---
title: For Loop In Javascript
date: 2019-03-24T01:58:45.284Z
categories: Javascript
image: this.jpg
---

Sometimes you need to do some action repeatedly.

For example here, for whatever reason I want to output "Hello loops" five times.

```js
console.log("Hello loops");
console.log("Hello loops");
console.log("Hello loops");
console.log("Hello loops");
console.log("Hello loops");
```

Loops offer an easy way to do this.

There are several different ways to implement loops in Javascript. 

* for statement
* while statement
* do..while statement
* for..in statement
* for..of statement

Today we'll learn how to use the most basic one, the `for` statement.

`for` loop statement has the following signature:

```js
for (initialExpression; condition; incrementExpression)
  statement
```

We have a keyword `for`, then in brackets we have `iintialExpression`, `condition` and `incrementExpression`.

Then goes the `statement`, or group of statements in curly brackets that will be executed on every iteration.

When a for loop executes, the following occurs:

1. The initializing expression `initialExpression`, if any, is executed. This expression usually initializes one or more loop counters. This expression can also declare variables.

    In theory if you don't need to initialize additional variables to use them in this loop - you can omit this part. But you'll have to leave the semicolon.

1. The condition expression is evaluated. If the value of condition is true, the loop statement or statements execute. If the value of condition is `false`, the for loop terminates.

    You can omit the condition expression as well, then it will be `true` by default. But be careful with that, because then you'll be locked in an infinite loop.

1. The statement executes. To execute multiple statements wrap them in curly brackets.

1. If present, the update expression `incrementExpression` is executed.
Control returns to step 2.

Now let's try a real example.

Let's say we want to output "Hello loops" again, but now using the `for` loop.

```js
for(let i = 0; i < 10; i++){
  console.log('Hello loops', i)
}
```

What happens is that first the `let i = 0` is executed. So we declare a new variable, called `i` and then assign value `0` to it. Then the condition expression is evaluated.

Currently it checks that `i` is less than `10`. `i` equals 0, it's less than `10` so the condition returns `true` and our `console.log` statement is being executed.

Then `i` get's incremented by 1, and we continue from the condition part.

Now theoretically you could just return `false` from the condition, so it will never be execetud.

```js
for(let i = 0; false; i++){
  console.log('Hello loops', i)
}
```

Why would you do that? I don't know but it's possible.

```js
for(let i = 0; false; i++){
  console.log('Hello loops', i)
}
```

You can also omit any part of the `for` staement. Or even all of them alltogether.

Try guessing what will happen in this case?

```js
for(; ; ){
  console.log('Hello loops')
}
```

It will cause an infinite loop, because an empty condition is being resolved as `true` by default.