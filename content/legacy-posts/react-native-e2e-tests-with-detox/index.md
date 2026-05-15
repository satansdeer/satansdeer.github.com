---
title: React Native E2E Testing With Detox
date: 2017-11-29T22:58:45.284Z
categories: ReactNative
image: e2e_with_detox.jpg
---

When you develop for web you have a lot of options to set up your e2e tests. _Protractor, CasperJS, PhantomJS, DalekJS_ and a lot of others. That's not the case in the world of mobile development. But worry not, I'm going to show you the best way (__in my opinion__) to test your application from __users point of view__.

I think everyone will agree that having bugs is lame. Testing your application manually is also lame: it requires a lot of time, and you can forget to test certain scenarios or just overlook bugs.

If only you could make robots do your job!

## E2E Automation

![test pyramid](/testing_pyramid.png)

Tests we are going to discuss here sit on top of the Martin Fowler's [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html). They are the slowest and most expensive to support. Every time you change any part of your system – you might break one of those. So as a rule of thumb __keep them low__. Test only required scenarios, and don't use them to test things that can be tested with __unit tests__. 

But even though they are slow, expensive and brittle – it's still much better than a meat-bag poking your app with his sausage fingers.

## Real Example

I'm going to assume that you are using React Native, but AFAIK the setup and workflow won't change much even if you write __native apps__.

Make sure you have Node v6 or later and XCode 8 or later installed. I recommend to use [n](https://www.npmjs.com/package/n) to manage node versions. Also make sure to install [yarn](https://yarnpkg.com/en/).

```sh
$ yarn global add create-react-native-app
$ create-react-native-app detox-e2e-tutorial
$ cd detox-e2e-tutorial
```

These commands will install the [create-react-native-app](https://github.com/react-community/create-react-native-app) script and create the `detox-e2e-tutorial` project.

Initially your newly created project is going to be run in _Expo app_. We want it to be __truly__ native. So run the following command:

```sh
$ yarn eject
```

It will ask you a couple of questions, here is how I answered them:

```sh
? How would you like to eject from create-react-native-app? React Native: I'd like a regular React Native project.
We have a couple of questions to ask you about how you'd like to name your app:
? What should your app appear as on a user's home screen? Detox E2E Tutorial
? What should your Android Studio and Xcode projects be called? detoxe2etutorial
```

Let's check that everything works:

```sh
$ yarn ios
```
It will start an app in simulator and also will run bundler in terminal (you can also run bundler manually with `yarn start`).

You should see:

```
Open up App.js to start working on your app!
Changes you make will automatically reload.
Shake your phone to open the developer menu.
```

Great, let's modify our `App.js` so we'll have something to test.

## Prepare The App

Open the `App.js` file in the root of your project and remove everything. Copy and paste the following contents there:

```html
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: 'Welcome!'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.state.greeting}
        </Text>
        <TouchableOpacity testID='hello_button' onPress={this.onButtonPress.bind(this)}>
          <Text style={styles.button_text}>Say Hello</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onButtonPress(greeting) {
    this.setState({
      greeting: 'Hello world!'
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    marginBottom: 30
  },
  button_text: {
    color: 'blue',
    marginBottom: 20
  }
});
```

Open the app (run `yarn ios`). You should see text _Welcome!_ and blue text _Say Hello_. Press that _Say Hello_ thing. The top label should change text to _Hello world!_.

This is super simple usage scenario, but it's enough for our purposes. Let's automate it.

## Setup Detox

Even though there are other options like Appium, I highly recommend [Detox](https://github.com/wix/detox). Reasons are totally practical:

* It's faster.
* It's less flaky.
* It's platform agnostic (you can test both iOS and Android)
* It works both with React Native and regular applications
* it has great documentation.

Unlike other e2e solutions _Detox_ uses __gray box__ testing model. Which means that it has some knowledge about the system internals.

And this is exactly why it's a lot more fast and reliable. I'm not going to go in-depth here, go and read [the documentation page explaining how Detox is different](https://github.com/wix/detox/blob/master/docs/More.DesignPrinciples.md).

Let's continue with setup. Make sure you have [Homebrew](https://brew.sh/) installed. Run:

```sh
$ brew tap wix/brew
$ brew install --HEAD applesimutils
```

This is _Detox_ dependency that's needed to control iPhone simulator.

Now install `detox-cli` to be able to run _Detox_ commands.

```sh
$ yarn global add detox-cli
```

And install _Detox_ for your project:

```sh
$ yarn add --dev detox
```

Install some test-runner. I'm going to use _Jest_:

```sh
$ yarn add --dev jest
```

Also add these lines to `scripts` block:

```json
"test:e2e": "detox test -c ios.sim.debug",
"test:e2e:build": "detox build"
```

Now create `e2e` folder in your projects root and create file `init.js` with following contents:

```js
const detox = require('detox');
const config = require('../package.json').detox;

// Set the default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
```

Also make _Detox_ to run with _Jest_, add `config.json` file to `e2e` folder:

```js
{
  "setupTestFrameworkScriptFile": "./init.js"
}
```

And add the following block to the `package.json`:

```json
"detox": {
  "test-runner": "jest",
  "runner-config": "e2e/config.json",
  "configurations": {
    "ios.sim.debug": {
      "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/detoxe2etutorial.app",
      "build": "xcodebuild -project ios/detoxe2etutorial.xcodeproj -scheme detoxe2etutorial -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      "type": "ios.simulator",
      "name": "iPhone 7"
    }
  }
}
```

Phew, almost there. Let's write our test.

## First Test

First and the only. Our application is very simple so will be our test.

```js
describe('Example test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('allows to change label text to "Hello world!"', async () => {
    await expect(element(by.id('label'))).toHaveText('Welcome!');;
    await element(by.id('hello_button')).tap();
    await expect(element(by.id('label'))).toHaveText('Hello world!');;
  });
});
```

Run the test:

```sh
$ yarn test:e2e:build
$ yarn test:e2e
```

## Congratulations

Now you can write user scenarios for your mobile applications. Go ahead and automate them all.

Here is [Detox documentation index](https://github.com/wix/detox/tree/master/docs), you'll find all the needed info including matchers and expectation there.
