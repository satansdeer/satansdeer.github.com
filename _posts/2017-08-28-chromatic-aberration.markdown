---
layout: post
title:  "Chromatic aberration"
date:   2017-08-28 18:08:10 +0300
categories: css, html
---
First time I saw this effect in a video for song Vicarious by American rock band Tool.

Here, check the video:

<iframe width="560" height="315" src="http://www.youtube.com/embed/UUXBCdt5IPg?" frameborder="0" allowfullscreen></iframe>

See, that color distortion on the edge of every object?

I didn't know that this is called chromatic aberration, but I was mesmerized.

I really like how it looks, so let's create a resembling effect for text using some CSS.

<p data-height="297" data-theme-id="dark" data-slug-hash="ZJqXPV" data-default-tab="result" data-user="satansdeer" data-embed-version="2" data-pen-title="ZJqXPV" class="codepen">See the Pen <a href="https://codepen.io/satansdeer/pen/ZJqXPV/">ZJqXPV</a> by Maxim Ivanov (<a href="https://codepen.io/satansdeer">@satansdeer</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Let's do this

The code is pretty simple, but let's go step by step.

```css
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
First usually goes some css-reset and normalization. I set `box-sizing: border-box` for every element including pseudo-elements (`*:before`, `*:after`). This option greatly simplifies making layout. 

## Box-sizing

By default the size of an element is calculated like this:
  * width + padding + border = __visible width__
  * height + padding + border = __visible height__

So if you set height of your `div` to `100px` and then set it's padding to `20px` then it's visible width will be `140px`! Quite mindbending, right?

And when we apply `box-sizing: border-box` we force padding to turn inwards, and be contained inside the border-box. This way by setting width of a `div` to `100px` it's visible width will also be `100px`

Then I set margin and padding to 0, just for convinience.

## The background

```css
body {
  background-color: #161620;
}
```

Here I just set the `background-color` of `body` element to some dark hue.

## Styling the letters

```css
.text {
  color: #fff;
  font-family: 'Futura';
  font-size: 4em;
  left: 50%;
  position: absolute;
  text-transform: uppercase;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
```

One thing worth noting here. I use `ABCSS` to arrange css attributes. There are other methods of sorting but in my opinion this one is the most predictable and is easiest to support. Almost every code editor supports automated line sorting.

```css
.text-letter {
  text-shadow: 0 0 2px white,
    0 0 1px white,
    1px 0 10px red,
    -1px 0 10px cyan;
}

.text-letter:nth-of-type(2), .text-letter:nth-of-type(4) {
   text-shadow: 0 0 2px white,
     0 0 1px white,
     2px 0 10px red,
     -2px 0 10px cyan;
}

.text-letter:nth-of-type(1), .text-letter:nth-of-type(5) {
   text-shadow: 0 0 2px white,
     0 0 1px white,
     4px 0 10px red,
     -4px 0 10px cyan;
}
```

Here I apply text shadow with different `offset-x` to letters according to their distance from the word center.

## The layout

```html
<div class="text">
  <span class="text-letter">c</span>
  <span class="text-letter">o</span>
  <span class="text-letter">l</span>
  <span class="text-letter">o</span>
  <span class="text-letter">r</span>
</div>
```

Layout is very primitive, the only thing I can say about it is that I used [BEM methodology](https://en.bem.info/methodology/) for naming here.
