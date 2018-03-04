---
layout: post
title: Firebase React Authentication Tutorial
date:   2018-03-01 05:58:45 +0300
categories: js react mobx
image: firebase_react.jpg
---

Sometimes you just need to make a fast prototype and you don't want to mess with backend, authentication, authorization and all of that. Here is where Google's firebase can help you. In this tutorial I'll show you haw to connect your react app with Firebase authentication module.

## What Are We Going To Build

Super simple app. Just 3 screens: Sign up, Log in and Home screen.

We'll use Firebase Authentication module to handle login/signup and React router to manage routing.

## Set Up Firebase

### Create New Firebase App

First go to [firebase console](https://console.firebase.google.com/) and create new app.

![New firebase app](/assets/images/firebase_react_1.png)

### Add Auth Method

Click __Authentication__ and then __SET UP SIGN-IN METHOD__.

![New sign in method](/assets/images/firebase_tutorial_2.png)

Enable __Email/Password__ authentication.

### Get Firebase Credentials

Go to project settings:

![New sign in method](/assets/images/firebase_tutorial_3.png)

And select __Add firebase to your web app__. Copy your credentials from there and save them to `.env` file in your project's root.

```sh
REACT_APP_FIREBASE_KEY=your_key
REACT_APP_FIREBASE_DOMAIN=your_app_id.firebaseapp.com
REACT_APP_FIREBASE_DATABASE=https://your_app_id.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your_app_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_SENDER_ID=sender_id
```

`create-react-app` webpack config automatically loads environment variables that start with `REACT_APP`, so we can reference them.

Read more about it in [create-react-app documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)

## Set Up The Frontend

We will set up the application using `create-react-app`. I assume that you have modern verion of `npm` so I'm going to use `npx` to run the script.

```sh
npx create-react-app firebase-auth-tutorial
```

Also we'll need routing so install React Router as well:

```sh
yarn add react-router
```

Also remove `src/index.css`, `src/App.css` and `src/App.test.js` files. We won't need them now.

### Connect App To Firebase

First install `firebase` package:

```sh
yarn add firebase
```

Now create file `src/base.js` with following contents:

```sh
import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
});

export default app;
```

### Add Routing

Open `src/App.js` and make it look like this:

```js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </Router>
  );
};

export default App;
```

Create `Home`, `LogIn` and `SignUp` components, for now just render some header. Here, for instance `src/Home.js`:


```js
import React from "react";

const Home = () => {
  return (
    <h1>Home</h1>
  )
}

export default Home
```

Run the application. You should have all routes available.

### Create The SignUp And LogIn Components

Now let's add some sign up logic. Create the `src/SignUp` directory and move our `SignUp.js` there. Also rename it to `SignUpView.js`. Make it look like this:

`src/SignUp/SignUpView.js`
```html
import React from "react";

const SignUpView = ({ onSubmit }) => {
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpView;
```

This is simple presentational component. We get the `onSubmit` handler as one of the props and attach it to our form. We defined `email` and `password` fields and added `Sign Up` button.

Now create the container component `src/SignUp/index.js:

```js
import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import SignUpView from "./SignUpView";

class SignUpContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);
```

This component will handle our sign up logic.

Let's look at our `handleSignUp` function. It's defined as an anonymous arrow function. I did it here to avoid using `bind(this)`.

In this example I really need class level `this` because of the `history` object I get from props by using `withRouter` wrapper. Otherwize I'd better define it as a regular function.

So in this function I `preventDefault` to avoid reloading page, get `password` and `email` from form `elements` and try to create new user on Firebase using `createUserWithEmailAndPassword` function.

Our `LogIn` component will be almost the same, just change the `createUserWithEmailAndPassword` function call to `signInWithEmailAndPassword`

### Add Private Routes

Ok, great now we can sign up, and log in, but unfortunately it doesn't make much sense, because home page is available even for the non-authorized user. Let's fix it.

Create `src/PrivateRoute.js` with following contents:

```html
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
```

Now let's use it in our `App.js`. Change the `Home` route to `PrivateRoute`:

```html
<PrivateRoute exact path="/" component={Home} authenticated={this.state.authenticated}/>
```

We used `authenticated` field of our `state`, but it doesn't exist yet. Let's fix it.

### Monitoring Auth Status

First remake your `App.js` to normal `Component` and set initial state:

```js
class App extends Component {
  state = { loading: true, authenticated: false, user: null };

  render(){
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            authenticated={authenticated}
          />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    )
  }
}
```

Now add `componentWillMount` to you `App.js` with following cotents:

```js
componentWillMount() {
  app.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({
        authenticated: true,
        currentUser: user,
        loading: false
      });
    } else {
      this.setState({
        authenticated: false,
        currentUser: null,
        loading: false
      });
    }
  });
}
```

So now we'll render `Loading...` until we get data from Firebase and update our state. Then we render routing and `PrivateRoute` redirects us to `Log In` page if we are not signed up.

## What To Do Next

Now you can add a redirect from login page if you are logged in already, also you can add log out functionality (go read [firebase documentation](https://firebase.google.com/docs/auth/web/manage-users))

Also with this knowledge you can add authentication to wallet app from the [React Ethereum Tutorial](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial) and build your own ICO platform!

So go crazy, build stuff and see you next time.
