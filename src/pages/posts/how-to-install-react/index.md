---
title: How To Install ReactJS
date: 2019-02-16T01:58:45.284Z
categories: React
image: how_to_install_react.jpg
---

How to install React?

ReactJS is a javascript library so by asking how to install it - you most likely mean "How to setup a React project?".

## Use A Sandbox

If you just want to tackle with React and you don't want to install it locally - you can use one of the sandboxes available online.

For example can use [CodeSandbox](https://codesandbox.io/s). Follow the link and then select **ReactJS** in the list of available templates.

## Use Directly In The Webpage

Another super simple way to start using ReactJS is to include links to it directly into your html page.

To do this you need to add three script tags, one for ReactJS itself,one for React-DOM and one for Babel, for JSX support:

```html
<html>
  <body>
    <!-- Load React. -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Your HTML layout -->
  </body>
</html>
```

Now you need to add so called **mounting point**, basically an HTML node, for example `div` that will serve as a container to your ReactJS application on this page.

```html
<!-- ... existing HTML ... -->

<div id="root"></div>

<!-- ... existing HTML ... -->
```

Now you can add your application code. Create `app.js` with the following content:

```jsx
const Button = () => {
  return <button onClick={() => alert("Hello ReactJS!")}>Click me!</button>;
};

ReactDOM.render(<Button />, document.getElementById("root"));
```

And add it to your webpage by adding new script tag:

```html
<script src="app.js" type="text/babel"></script>
```

You can see this code in action in this [simple Glitch example](https://glitch.com/edit/#!/inline-react-example?path=app.js).

## Use Create React App

You can quickly bootstrap ReactJS project on your machine using `create-react-app`.

To do this you'll have to use Terminal application.

First make sure you have **NodeJS** installed, to do this run `node -v`, it will output the version number. If not - go to [NodeJS website](https://nodejs.org) and install it.

After you've made sure you have **NodeJS** installed - go to the folder where you have your programming projects, on my machine I have folder named `Workspace`. And execute the following command there:

```
npm create-react-app hello-react
```

This script will create folder structure for your project and install all the required libraries. Also it will provide you with some script fields in your `package.json` so you can `start`, `build` and `test` your react application.

After the script will finish running - `cd` to `hello-react` folder and run `npm start` to run your application.
