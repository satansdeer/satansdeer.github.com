---
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

## Let's See The Example

Getting back to ducks. Let's describe a `Duck`. We have very low expectations on it. We only expect it to be able to quack and nothing else.

```js
describe('Duck', function(){
  describe('#quack', function(){
    it('produces "Quack" sound', function(){
      const duck = new Duck();
      expect(duck.quack()).toEqual('Quack');
    });
  });
});
```

Fine, now lets define the basic duck.

```js
class Duck{
  constructor(){
    // Duck initialization process
  }

  quack(){
    return 'Quack';
  }
}
```

We run the spec and it passes. Cool, now let's create a derived class `MechanicalDuck`. It should also be able to quack. The only difference is that it needs batteries to operate.

```js
class MechanicalDuck extends Duck{
  constructor(battery=null){
    super();
    this._battery = battery;
  }

  quack(){
    if(!this._battery){
      throw 'Need battery to operate.';
    }
    return 'Quack';
  }
}
```

Now according to LSP, we should be able to safely change instances of base class to instances of derived class. Let's change our spec a bit and try to use `MechanicalDuck` instead of `Duck`.

Uh-oh, test failed. `MechanicalDuck` needs battery to quack. So `MechanicalDuck` here is clearly not a duck. Even though it's interface might look similar, it's __behavior__ is totally different.

## But What Would Be A Proper Subclass?

In our case it might be a `FemaleDuck`. Let's implement it.

```js
class FemaleDuck extends Duck{
  constructor(){
    super();
    // Initialization of female stuff
    this._butt = new FemaleDuckButt();
  }

  layAnEgg(){
    const egg = this._butt.layAnEgg();
    return egg;
  } 
}
```

`FemaleDuck` will successfully pass the duck test, as we didn't change the behavior, but only extended it. Our duck can lay eggs, hurray!
