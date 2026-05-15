---
title: Typescript Constructor Shorthand
date: 2019-02-22T01:58:45.284Z
categories: Typescript
image: thumb.jpg
---

Here is a thing, in Typescript there is a shorthand to create and assign class properties from constructor params.

Imagine you have following code, let's say you have class `User`:

```typescript
class User {
  private name: string;
  private surname: string;
  private age: number;

  constructor(name: string, surname: string, age: number) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }
}
```

You can write same class using shorter syntax:

```typescript
class User {
  constructor(
    private name: string,
    private surname: string,
    private age: number
  ) {}
}
```

In this case `Typescript` will automatically generate thore properties. And yes both definitions will produce same Javascript code:

```javascript
var User = /** @class */ (function() {
  function User(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }
  return User;
})();
```

And it works not only for `private` access level modifier, you can use `public` or `protected` as well.

So you can use this constructor assignment technique to save some lines of code.
