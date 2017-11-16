---
layout: post
title:  "Open/Closed Principle"
date:   2017-11-13 20:58:45 +0300
categories: js tdd
image: open_closed_principle.jpg
comments: true
---

__OCP__ states that software entities (classes, modules, functions) should be open for extension, but closed for modification. Let's figure out what exactly does it mean…

That basically means that you should write your modules in a way that wouldn't require you to __modify__ it's code in order to __extend__ it's behavior.

## Let's Get To Real World Example

I mean imaginary world example. Imagine you have a machine that can make _chocolate-chip_ and _fortune_ cookies.

```js
describe('CookieMachine', function(){
  describe('#makeCookie', function(){
    it('returns requested cookie when requested cookie with known recipy', function(){
      const cookieMachine = new CookieMachine();

      expect(cookieMachine.makeCookie('chocolate-chip-cookie')).toEqual('Chocolate chip cookie');
      expect(cookieMachine.makeCookie('fortune-cookie')).toEqual('Fortune cookie');
    });

    it('raises an error when requested cookie with unknown recipy', function(){
      const cookieMachine = new CookieMachine();

      expect(function(){ cookieMachine.makeCookie('unknown-cookie'); }).toThrow('Unknown cookie type.');
    })
  });
});
```

Here is `CookieMachine` itself:

```js
class CookieMachine{
  constructor(){
    // Sophisticated setup process
  }

  makeCookie(cookieType){
    switch(cookieType){
      case 'chocolate-chip-cookie':
        return 'Chocolate chip cookie';
      case 'fortune-cookie':
        return 'Fortune cookie';
      default:
        throw 'Unknown cookie type.';
    }
  }
}

```

Let's imagine that it's Christmass season and we need to cook Pepper cookies. See, we violated OCP and now we have to change `CookieMachine` code and add new `case` block.

## Let's Fix It

We'll introduce an abstraction, `CookieRecipy`:

```js
class CookieRecipy{
  constructor(){
    // Sophisticated setup process
  }

  cook(){
    // Abstract cooking process  
  }
}

class ChocolateChipCookieRecipy extends CookieRecipy{
  constructor(){
    super();
    this.cookieType = 'chocolate-chip-cookie'
    // Sophisticated setup process
  }

  cook(){
    return 'Chocolate chip cookie';
  }
}

class FortuneCookieRecipy extends CookieRecipy{
  constructor(){
    super();
    this.cookieType = 'fortune-cookie'
    // Sophisticated setup process
  }

  cook(){
    return 'Fortune cookie';
  }
}

class PepperCookieRecipy extends CookieRecipy{
  constructor(){
    super();
    this.cookieType = 'pepper-cookie'
    // Sophisticated setup process
  }

  cook(){
    return 'Pepper cookie';
  }
}
```

And also we'll modify `CookieMachine` to accept these recipies in constructor. We will use the `reduce` method to reduce the recipies list to an object with cookie types for keys:

```js
class CookieMachine{
  constructor(...recipies){
    this._recipies = recipies.reduce(function(accumulator, item){
      accumulator[item.cookieType] = item;
      return accumulator;
    }, {});
  }

  makeCookie(cookieType){
    if(this._recipies.hasOwnProperty(cookieType)){
      return this._recipies[cookieType].cook();
    }
    throw 'Unknown cookie type.'
  }
}
```

Great, now if we want to cook some new cookie – we just create new cookie recipy.

## Let's Update The Specs

Now we have to pass cookie types upon `CookieMachine` creation.

```js
describe('CookieMachine', function(){
  describe('#makeCookie', function(){
    it('returns requested cookie when requested cookie with known recipy', function(){
      const cookieMachine = new CookieMachine(new ChocolateChipCookieRecipy(), new FortuneCookieRecipy(), new PepperCookieRecipy());

      expect(cookieMachine.makeCookie('chocolate-chip-cookie')).toEqual('Chocolate chip cookie');
      expect(cookieMachine.makeCookie('fortune-cookie')).toEqual('Fortune cookie');
      expect(cookieMachine.makeCookie('pepper-cookie')).toEqual('Pepper cookie');
    });

    it('raises an error when requested cookie with unknown recipy', function(){
      const cookieMachine = new CookieMachine();

      expect(function(){ cookieMachine.makeCookie('unknown-cookie'); }).toThrow('Unknown cookie type.');
    })
  });
});
```

Great, test pass now and we can cook ANY COOKIES WE WANT!
