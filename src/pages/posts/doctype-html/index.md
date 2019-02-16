---
title: What is doctype in HTML documents? And why do you have to specify the doctype?
date: 2019-01-30T04:58:45.284Z
categories: javascript
image: doctype_html.jpg
---

If you open any webpage, and look at it's source code, you'll always see
a little thingy just before the opening html tag. So what is it, and what does it do?

This string is a document type declaration, and it's important to note that it's not an html tag itself, but it's an instruction for the browser on what version of HTML is used on this page.

Good news, modern web developers don't have to know any doctypes other than doctype html, because since the html5 it's the only doctype you should set for your webpages.

Before html5, there were several others that had more complex syntax. You had to specify the link to the actual doctype declaration. For example like in this html4.01 strict. We specify the link to the doctype on w3.org website

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

`https://www.w3.org/TR/html401/strict.dtd`

If you open the link, you will see how those type declarations used to look. It was a structured document that was telling browser what elements and attributes are allowed to use in current html version.

But as I said the modern type declaration dosent' requiere you to specify the link to declaration file manually. And the only thing you have to worry about is to include this instruction in the beginning of your html document.

Now why, do you need to specify it?

In the dark ages of the internet, before the web standards, there we two huge browsers: Netscape Navigator and Microsoft Internet Explorer. And web pages were usually developed separately for each of them.

After the creation of the standards browsers introduced two ways of rendering, one for standards compliant websites and quirks mode to support the legacy sites.

So when you specify the doctype in the beginning of your doument - you tell the browser that the webpage should be rendered in standards mode.

Otherwise if you omit it - you make the browser to use the quirks mode.

Let's look at the examples, i've created a two webpages with almost identical content. I've set the doctype for one page and omitted for another. Let's see how will they render.

If you right click the page and check out the page info, you'll see what mode is currently being used to render the page.

First thing i'd like you to note is different margin of the h1 element. In quirks mode it doesn't have the top margin.

Next you can see that I have an orphaned list item element here. And in quirks mode this item has a bullet point.

Now take a look at the paragraph in the bottom. I have an uppercased class name for it. And in styles it has lowercase notation. As you can see in quirks mode classNames are case insensitive, so the class name is still being applied.

You can check out the list of quirks that will be used for your page on mozilla website.

Now to sum it up: Doctype is a type declaration that should go as the first line in your html document before the opening html tag. It makes browser render the page in stadards mode. And you should only use the `<!doctype html>` since the html5 was released.

`youtube:https://www.youtube.com/embed/5E1eQ_gNmyU`
