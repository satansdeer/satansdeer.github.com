---
layout: post
title:  "Liskov Substitution Principle"
date:   2017-11-10 20:58:45 +0300
categories: js tdd
image: liskov_substitution_principle.jpg
comments: true
---

In __1988__ Barbara Liskov wrote something that now stands for __L__ in __SOLID__ principles. Let's dive in and learn what is it and how does it relate to __TDD__.

Here is the original formulation: _"If for each object __o1__ of type __S__ there is an object __o2__ of type __T__ such that for all programs __P__ defined in terms of __T__, the behavior of __P__ is unchanged when __o1__ is substituted for __o2__ then __S__ is a subtype of __T__."_

Simply speaking: _"Derived class objects must be substitutable for the base class objects. That means objects of the derived class must behave in a manner consistent with the promises made in the base class contract."_

Speaking even more simply: _"Derived class objects should __complement__, not __substitute__ base class behavior."_

![liskov](/assets/images/liskov_1.png)

LSP can also be described as a counter-example of [Duck Test](https://en.wikipedia.org/wiki/Duck_test): _"If it looks like a duck, quacks like a duck, but needs batteries – you probably have the wrong abstraction"_

## So, In Real World

If you have some class __Foo__ and a derived class __SubFoo__, then if you change all the notions of __Foo__ class to __SubFoo__ – the program execution shouldn't change, as __SubFoo__ dosen't change the __Foo__ class functionality, and only extends it.

  
