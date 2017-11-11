---
layout: post
title:  "Magical Mystery Guide For Async/Await In Javascript"
date:   2017-09-28 22:58:45 +0300
categories: javascript
image: thumb-image.jpg
---

Hey there! Today we are going to look at __async__ and __await__ keywords that allow you to pause functions execution, and therefore let you write __asynchronous__ code that reads like __synchronous__.

But first let's go through other ways of dealing with asynchronicity in javascript. You know, just to make you __appreciate__ how async/await allows you to write more readable asynchronous code.

## First We Had Callbacks

Imagine that we have some __MagicalWorldAPI__, and we need to get a list of quests of the hero of some imaginary world.

With callbacks it would look somewhat like this.

```js
getWorld(function(err, world){
  if (err) {
    // handle error;  
    return
  }
  getHero(world.heroId, function(err, hero){
    if (err) {
      //handle error;  
      return
    }
    getQuests(hero.questsIds, function(err, quests){
      if (err) {
        //handle error;  
        return
      }
      console.log(quests);
    }
  });
});
```

Doesn't look very good, right? A lot of nesting, also you have to handle errors separately in every callback and it's kinda error prone. You might forget to add a return statement after you've handled an error, or do another silly mistake.

Can we improve this? 

## Yes, With Promises

Let's imagine that our __MagicalWorldAPI__ was updated and now it returns `Promise` objects. Let's adapt to it.

```js
getWorld().then(function(world){
  return getHero(world.heroId)
}).then(function(hero){
  return getQuests(hero.questsIds)  
}).then(function(quests){
  console.log(quests)  
}).catch(function(err){
  //handle error
});
```
Now we have a callback in `catch` function where we can handle errors from any part of that chain. Better, but the code is still hard to read. If only we could make it look synchronous...  

## Async/Await? Not yet, generators

```js
const co = require('co')

co(function* (){
  var world = yield getWorld();
  var hero = yield getHero(world.heroId);
  var quests = yield getQuests(hero.questsIds);
  console.log(quests);
}).catch(function(err){
  //handle error  
})
```

Ok, the part where we use our imaginary __API__ looks nice now, but the other code is cryptic! What does that `*` in function declaration do and what are those `yield` statements?

The asterisk after the `function` statement makes it create a __generator function__ and the `yield` keyword pauses __generator function__ execution and the value of the expression following the `yield` keyword is returned to the generator's caller. 

And `co` is a nice function that can resolve a __generator function__ and return a promise. 

So in this example, the `getWorld()` returns a promise. Then `yield` pauses further execution of our star signed function and passes the result of `getWorld()` to the `co` function. The `co` function takes the promise, resolves it and passes the value back to the generator function where it is being assigned to the `world` variable.

Then the same is repeated for other variables.

## Finally we are getting to async/await

Let's rewrite our code once more.

```js
async function(){
  try{
    var world = await getWorld();
    var hero = await getHero(world.heroId);
    var quests = await getQuests(hero.questsIds);
    console.log(quests);
  }
  catch(err){
    //handle error
  }
}
```
Looks familiar, right? We just changed `yield` to `await`, instead of `fuction*` we now have `async function` statement and we don't use the `co` function here.

Oh, and another thing, we now use the `try/catch` to handle errors. This is good, because we can now handle both sychronous and asynchronous code errors the same way.

__So what happens here?__

The `async function` statement defines an __asynchronous function__. When an __async function__ is called, it returns a Promise. When the __async function__ returns a value, the `Promise` will be resolved with the returned value. When the __async function__ throws an exception, the `Promise` will be rejected.

Also an __async function__ can contain an `await` expression, that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the __async function's__ execution and returns the resolved value.

The execution flow will go a lot like in previous example. When we'll stumble upon the first `await` statement – our __async function__ will get paused until the `getWorld()` promise will be resolved. Then __async function__ will get unpaused and the resolved value will be assigned to the `world` variable.

Then the same will be repeated for other varibales.

## Summary

Today we've learned that using `async` statement you can create __asynchronous function__.

Inside that function you can use the `await` statement in front of expression that returns a `Promise`.

When the __async function__ will by executed, it will pause just where the `await` statement is until that `Promise` is resolved.

And also we've learned that using `async/await` you can simplify reading of an asynchronous code by giving a more synchronous flow to it.

Make sure to read the second part, where you'll see how async/await works under the hood, get more usage examples and have a quick glance on the future of this new syntax.

<button>Continue to the second part →</button>
