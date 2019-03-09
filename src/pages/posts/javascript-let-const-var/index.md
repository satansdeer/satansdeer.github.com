---
title: What Is The Difference Between Let, Const and Var In Javascript 
date: 2019-03-09T01:58:45.284Z
categories: Javascript
image: image.jpg
---

One of the most important things in programming is to clearly express your intent.

With release of ES6 we got two new keywords to define identifiers for our values: `let` and `const`.

Before that we had only `var` in our toolbelt. And in my opinion using `let` and `const` instead allows you to write more clear, eloquent and expressive code.

Simply speaking `let` allows you to define the identifier which value can be changed in the future, and `const` defines the one that is unchangeable.

Now let's figure out how it all works.

## Using `var`

In Javascript `var` declares new variable:

```js
var someVariable;

console.log(someVariable)
// undefined
```

Initially it's value will be `undefined`.

After you've declared new variable you can assign it new value.

```js
var someVariable;
someVariable = 1;

console.log(someVariable);
// 1
```

You can also combine those two steps and assign variable it's initial value while declaring it:

```js
var someVariable = 1;

console.log(someVariable);
// 1
```

You can declare variables in different **scopes**. In Javascript `var` can have on of two types of scope: **global** or **function** scope.

If you declare variable inside some functions body - it will only be visible inside this function and also functions declared inside of it. This is **function scope**.

Otherwise if you declare variable outside of any function - it will have **global** scope. And will be visible in all the functions you will use.

Another important thing about `var` in Javascript is that you can access it before it is declared. It is possible because of the process called **hoisting**.

That means that variable declarations are moved to the top of their **scope** when Javascript is being executed.

```js
console.log(myName);
// undefined
var myName = "Maksim";
```

In this example `console.log` will output `undefined`. It happened because the declaration of `myName` was moved to the top.

So this code is equivalent:

```js
var myName;
console.log(myName);
myName = "Maksim";
```

It's important to note that only variable declaration is moved to the top, not value assignment.

Ok, now you know about the **scopes** and **hoisting**, let's move on.

## Using `let`

`let` is a block scoped version of `var`. That means that it's visibility will be litimed to block, statement or expression where it was defined and all the inner blocks.

So if you declare a variable using `let` inside a `for` loop - it will be visible only inside this `for` loop block.

```js
for(let i = 0; i < 100; i++){
    console.log(i)
    // Here it will output all numbers from 0 to 99 
}

console.log(i)
// Here you'll get "ReferenceError: i is not defined"
```

Contrary to that `var` would be visible outside as well:

```js
for(var i = 0; i < 100; i++){
    console.log(i)
    // Here it will output all numbers from 0 to 99 
}

console.log(i)
// 99
```

And I think it's more desirable behavior. I can't really think of an example where you would want to have access to that `i` variable outside of the `for` loop.

In fact I think that the behavior of `var` in this case is even more bug prone. Because it allows the unwanted use of previously defined variables and can lead to confusion.

Also variables declared with `let` don't get **hoisted**.

```js
console.log(myName);
// Here you'll get "ReferenceError: can't access lexical declaration `myName' before initialization"
let myName = "Maksim";
```

And again, I can't come up with an example where you would really want to have the variable **hoisted**.

So in modern environments `let` seems to be a better, more controlled alternative for `var`. And if you need an identifier which value you can change - `let` is a preferred option.

## Using `const`

`const` has the same differences from `var` as `let` does, and on top of that, after it's value is defined - it can't be re-assigned.

It's important to note that value still can be changed:

```js
const dragon = {name: "Ancalagon the Black"}
dragon.name = "Glaurung" // This is valid

dragon = {name: "Glaurung"} // This is invalid
```

## Recap

So as a recap `let` is **non-hoisted**, **block-scoped** version of `var`. And `const` is also **non-reassignable** on top of that.

In my code I prefer to use `const` whenever possible. This allows me to signalize to myself and other developers that certain variable is not meant to change.

I don't use `for` loops often, when I work with arrays I prefer to use `map`. But when I do - I use `let`.

So my recommendation is to never use `var` and prefer `const` and `let` instead, as they provide more context to develope and act more predictably.