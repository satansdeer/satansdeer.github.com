---
title: How do you serve a page with content in multiple languages?
date: 2019-02-03T01:58:45.284Z
categories: html i18n
image: multiple_languages.jpg
---

How do you serve a page with content in multiple languages?

Serving webpages in multiple languages is a very big topic and for me it breaks down into three main parts.

First we need to recognize what language is preferred by current user.

## Choosing The Right Language To Serve

Essentially you have two options - either to let user specify the preferred language explicitly, or make your best guess based on existing data about the user.

Let's begin with setting language explisitly.

### Setting Language Explicitly

First way to allow user to choose the language of the page is to include locale segment into the url.

You can see this approach on developer.mozilla.org:

* (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language]

It also provides some additional benefits. For example it provides consistency when sharing multilingual content.

So if I decide to share this page by copying the url from address bar, I can be sure that my friend will receive same version of it, because locale was included into the url.

Alternatively you can add some language selection mechanism that will store the picked language in current session, for example in cookies. So you'll be able to serve the localized version of your page, based on that information.

This is good, it allows your users to specify preferred language and doesn't require them to know that this functionality already exists in their browser.

### Guessing Language Preference

There is special `Accept-Language` request header that you can use to get the langage preference.

This header has a list of locales with priorities, where default priority is 1.

```
Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5
```

All major browsers allow users to specify preferred languages. To do this in firefox you go to `about:preferences`, **General** tab and click the **Choose** button on **Language** section. By moving languages up and down you'll specify their priority.

This information will end up in the `Accept-Language` request header.

After we know what language is preferred we need to serve the page properly, which includes specifying the proper encoding, and also providing the meta information in headers and html tags, telling what is the language of the content we are serving.

## Providing Language Info For Current Page

Why is it so important to properly set the charset?

Well, if you don't do that browser might use the default one, which is either [Latin-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) or [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) in html5, both of which being single byte encodings, therefore providing only 256 characters.

As you can imagine it's not enough to properly display text containing characters from multiple alphabets.

First thing browser will check when trying to get the correct charset is the `Content Type` header.

The syntax for it is the following.

First goes the MIME type, in our case `text/html`, then after a semicolon goes charset.

Another way to provide the charset for the html document is by using the `<meta charset="utf-8"/>` tag. Actually you should always do this even if charset is already provided in headers. In this case just make sure they match.

There is also an html attribute `lang`, that allows you to provide the info about the language of the current page or part of the page, for example a paragraph.

Look at this:

If most of your page is in english but you have a few paragraphs in german or french - you can specify language of those paragraphs by setting the lang attribute.

And lastly we need to make sure to let search engines know that we have localized versions of some page, so they won't be treated as content duplicates.

## Optimizing For Seo

Serving same page in multiple languages can lead to a lot of duplicated content, which can harm ranking your page in search engines.

To avoid that you should specify the canonical url - with default or main language of your content and specify localized versions of this page as alternatives with language specified in hreflang field. Using `<link rel="alternate" hreflang='en-gb'>`
