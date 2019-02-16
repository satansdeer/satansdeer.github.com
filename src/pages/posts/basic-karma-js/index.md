---
title: Basic Karma JS Tutorial
date: 2017-10-08T22:58:45.284Z
categories: js tdd
image: karma_setup_thumb.jpg
comments: true
---

_Psst, do you write javascript that runs in browser?_ I have something for you, it's&nbsp;called&nbsp;**Karma**, you'll like it.

When you write javascript code, you have to test it. The same code might work slightly differently in different browsers, so you better test your code at least in most common of them.

That's what **Karma** is for.

Karma is a test runner. It allows you to run your tests in real browsers with real DOM. It can even connect to remote clients and you can test your code on _Browserstack_.

That's not the only benefit you get using Karma. It can speed up your work by watching the files and re-running specs when you save the related files. This will shorten the feedback loop so you'll have much smoother coding expirience.

## How does it work?

**Karma** has two parts, server and client (or clients).

Server is the main part, it:

* watches your files
* communicates with clients and manages them (through SOCKET connection)
* serves the code and tests to clients (through HTTP)
* reposts test results to you

![karma high level architecture](/karma_scheme.png)

Client runs tests against the code and reports the results to server.

## Installation

```bash
# Install Karma
$ yarn add karma

# To be able to use command "karma" install karma-cli
$ yarn add karma-cli

# Install plugins
$ yarn add karma-jasmine jasmine-core karma-chrome-launcher
```

This will install karma and its plugins into `node_modules` in your current working directory and also save these as `devDependencies` in `package.json`.

Now create the **Karma** config file.

```bash
karma init
```

Accept all the defaults. Set source and test files locations as `js/*.js` and `test/*_spec.js`. Here is what I had:

```bash
Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
>

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> js/*.js
> test/*_spec.js
>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes
```

Now **Karma** should say that config file was successfully created.

## Let's write some specs!

You are probably familiar with the problem we are going to describe with specs. Keep in mind that **Karma** doesn't give you any functionality to write specs. All those `describe`, `it`, `expect` are coming from **Jasmine**, that we are using as testing framework here.

Create file `test/fizzbuzz_spec.js` and paste the following contents to it:

```javascript
describe("fizzbuzz", function() {
  describe("#process", function() {
    it("returns Fizz if number is divisible by 3", function() {
      expect(fizzbuzz.process(3)).toBe("Fizz");
      expect(fizzbuzz.process(6)).toBe("Fizz");
    });

    it("returns Buzz if number is divisible by 5", function() {
      expect(fizzbuzz.process(5)).toBe("Buzz");
      expect(fizzbuzz.process(10)).toBe("Buzz");
    });

    it("returns FizzBuzz if number is divisible by both 3 and 5", function() {
      expect(fizzbuzz.process(15)).toBe("FizzBuzz");
      expect(fizzbuzz.process(30)).toBe("FizzBuzz");
    });

    it("returns number itself if number is not divisible by 3 or 5", function() {
      expect(fizzbuzz.process(4)).toBe(4);
    });
  });
});
```

This spec represents classic interview question used to weed out the incompetent programmers. No doubt you are familiar with it.

Now start karma.

```bash
$ karma start
```

It will watch your files and re-run specs if they will change.

As you don't have the fizzbuzz module, all four specs should fail.

Create the file `js/fizzbuzz.js` and paste the following code there:

```javascript
var fizzbuzz = (function() {
  function process(n) {
    if (!(n % 15)) {
      return "FizzBuzz";
    }
    if (!(n % 3)) {
      return "Fizz";
    }
    if (!(n % 5)) {
      return "Buzz";
    }
    return n;
  }

  return {
    process: process
  };
})();
```

To keep this tutorial dead-simple I defined `fizzbuzz` globally (it will be available from `window.fizzbuzz`) as self-invoking anonymous function.

It's the most dumb, simple and straightforward solution I know, but now all the tests should pass.

While Karma is running, play around with the code. Try to improve the solution. Try to implement it as a one-liner.

What's the minimum amount of characters you need to solve this task?

`youtube:https://www.youtube.com/embed/0_XhWBqgx-c`

<sign-up-form></sign-up-form>
