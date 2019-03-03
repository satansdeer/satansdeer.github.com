---
title: How To Comment React JSX Code
date: 2018-05-13T22:58:45.284Z
categories: React
image: thumb.jpg
---

Sometimes you need to comment out some `JSX` code or just add some informative comment to your layout. How to do it?

First problem is that `JSX` is not `HTML` and `HTML` comments wont work:

```html
render(){
  <div>
    <!-- <SomeComponent /> --> // This won't work
  </div>
}
```

Even though JSX will be compiled to Javascript - you can't use regular JS comments. They will be parsed as text and added to your layout.

So the only working option is to __use multiline comments inside curly braces__:

```jsx
render() {
  return (
    <div>
      <Component1 />
      {/* <Component2 /> */}
    </div>
  )
}
```

## Editor Support

Now, good news if you use VSCode, you can press `Ctrl + /` and it will add `{/* */}` around selected lines.

## More About JSX

Btw I wrote a couple of new articles about JSX:

* [Starting With JSX](https://maksimivanov.com/posts/starting-with-jsx/)
* [Conditions Inside JSX](https://maksimivanov.com/posts/conditional-rendering-in-jsx/)

