---
layout: post
title:  "Don't Mock What You Don't Own"
date:   2017-11-10 20:58:45 +0300
categories: js tdd
image: dont_mock_wat_not_own.jpg
comments: true
---

I was refactoring specs of some Rails application when I decided to mock the `ImageUploader` class of Carierwave. I wanted to be able to check for cpecific image url. __But was it a good idea?__

## No, Don't Do It

I know it might be tempting to mock libraries that make database or network calls to make specs run faster, but that's not what test doubles are meant for.

Test doubles are ment to help you create practical and convinient interfaces between parts of your application.

![mocking](/assets/images/dont_mock_1.png)

Imagine you have to create some _thing_ that you should integrate in already existing code.

Using test double you can easily check if the interface of the _thing_ (that is not implemented yet) is clear and easy to use. And if not – it's cheap to throw it away and start over.

Now looking from __this perspective__ you should see that mocking third-party _thing_ doesn't make any sense.

But not only it's meaningless…

## Wait, What Perspective?

I mean, TDD is not only about testing, it's also about design. Mocking external lib won't help you to create good design, because you don't have any control over it.

The idea is to use mocks as quick and rough prototypes, to see how your _thing_ will be integrated into existing code. If you see that the interface is not very handy – you just write the mock differently, with different methods or with different method signatures.

So you just prototype your interface first and write your implementation later.

Now if you apply this logic to mocking external library (which interface you cannot change), you'll see that it makes zero sense.

Got it? Let's continue…

## It's Also Harmful

Most obvious danger is getting false positives (or negatives, depends on perspective). In other words your test will pass where the actual thing won't work. Either because you've mocked it in a wrong way or the library you were mocking changed slightly after an upgrade.

Another downside is that you might end up with a lot of excessive code that doesn't bring any value. It can also make it harder to understand what is going on in your code.

## But HTTP And Database Calls Make My Tests Slow

If that's really a problem – __create wrappers__ around that third party _thing_.

Don't forget to write integration tests for that wrappers.

As a bonus you'll make it clear what functions of that external lib you __really use__, and it will be much easier to replace that dependency later.

## Summary

In my case I went with using `ImageUploader` directly, writing a wrapper for it would be just crazy.

I hope this small article will help you avoid this caveat.

If you are interested in further reading on that topic – here are some more articles:

- http://davesquared.net/2011/04/dont-mock-types-you-dont-own.html
- http://www.markhneedham.com/blog/2009/12/13/tdd-only-mock-types-you-own
- http://blog.8thlight.com/eric-smith/2011/10/27/thats-not-yours.html
- http://stackoverflow.com/questions/1906344/should-you-only-mock-types-you-own
