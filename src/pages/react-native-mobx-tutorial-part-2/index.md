---
title: React Native Mobx Tutorial - Part 2
date: 2018-02-13T05:58:45.284Z
categories: js react mobx
image: react_native_mobx_1_thumb-2.jpg
---

This is second part of the MobX tutodial series, today we'll setup project and add our mobx stores.

## Table Of Contents

1. [What is MobX](/posts/react-native-mobx-tutorial)
2. [Making ReactNative app](#)
2. [Testing stores](#)
2. [Testing views with Enzyme](#)

## Setting Up

Ok, enough rolling dice, let's do the real thing.

We'll use `create-react-native-app` to setup our project structure.

Run the following commands:

```sh
$ yarn global add create-react-native-app
$ create-react-native-app binance-tracker
$ cd binance-tracker
```

Now you can execute `yarn start` to run the project in __Expo__ app or exucute your app in simulator running `yarn ios` or `yarn android`.

Install dependencies:

```sh
$ yarn add mobx mobx-react react-navigation
```

* Mobx is needed for state management
* `mobx-react` will provide the `@observer` decorator 
* `react-navigation` will provide necessary navigation capabilities

Let's start adding functionality.

## Application structure

Our application will have two screens. `ProfileScreen` where we'll allow to update Binance credentials and `HomeScreen` where we'll show balances and some additional info.

Here is how our `App.js` will look:

```html
import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./src/HomeScreen";
import ProfileScreen from "./src/ProfileScreen";
import { Provider } from "mobx-react";
import stores from "./src/stores";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#272C36"
  },
  navigator: {
    backgroundColor: "#272C36"
  }
});

const Navigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <SafeAreaView style={styles.safeArea}>
          <Navigator style={styles.navigator} />
        </SafeAreaView>
      </Provider>
    );
  }
}
```

Here we use `StackNavigator` from `react-navigation` package to be able to temporarliy add `ProfileScreen` on top of `HomeScreen`. It handles the animation and history. So we can easily get back to our previous screen.

`SafeAreaView` is needed only for IphoneX, it adds vertical margins to not interfere with it's form factor.

And then we wrap everything into `Provider`. It allows to inject defined stores to it's child components using `@inject` decorator (or function, if you are not big fan of decorators).

Stores are defined in `src/stores/index.js` that exports them in an object:

```js
import ApiKeysStore from './ApiKeysStore';
import BinanceApiStore from './BinanceApiStore';

const apiKeysStore = new ApiKeysStore()
const binanceApiStore = new BinanceApiStore(apiKeysStore)

export default {
  apiKeysStore: apiKeysStore,
  binanceApiStore: binanceApiStore,
};
```

Now we'll be able to inject them into components using this object keys.

Like this:

```js
@inject('apiKeysStore')
@observer
export default class ProfileScreen extends React.Component {
```

## Getting API Keys

In order to communicate with Binance we first need to get the `API_KEY` and `API_SECRET`. To do that – [create new account there](https://www.binance.com/?ref=12930619) (yes, it's my affiliate link, remove the `ref` attribute if you don't want me to get any affiliate comissions from you).

From your account page go to [api setup page](https://www.binance.com/userCenter/createApi.html).

Create api key/secret and save somewhere, we'll use them later.

## Adding First Screen

We need to be able to save those API keys somehow. Let's create our first screen with two inputs and submit button.

![binance tracker](/assets/images/binance_profile.png)

```html
/* Imports omitted */

/* Style declarations omitted */

@inject("apiKeysStore")
@observer
export default class ProfileScreen extends Component {
  /* Handler functions omitted */

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.props.apiKeysStore.setApiKey}
          value={this.props.apiKeysStore.apiKey}
          placeholder="API_KEY"
        />

        <TextInput
          style={styles.input}
          onChangeText={this.props.apiKeysStore.setApiSecret}
          value={this.props.apiKeysStore.apiSecret}
          placeholder="API_SECRET"
          placeholderTextColor="#DDBC44"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={this.updateKeys}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePressCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
```

As you can see here, after we injected `apiKeyStore` it became accessible as `prop` variable.

## ApiKeysStore

```js
import {observable, computed, action} from 'mobx';
import { AsyncStorage } from 'react-native';

export default class ApiKeysStore {
  @observable apiKey = '';
  @observable apiSecret = '';

  async saveApiKeys() {
    try{
      await AsyncStorage.setItem('@ApiKeysStore:apiKey', this.apiKey);
      await AsyncStorage.setItem('@ApiKeysStore:apiSecret', this.apiSecret);
    } catch(e) {
      console.log(e)
    }
  }

  @action setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  @action setApiSecret(apiSecret) {
    this.apiSecret = apiSecret;
  }

  @action async loadApiKeys() {
    try {
      this.apiKey = await AsyncStorage.getItem('@ApiKeysStore:apiKey');
      this.apiSecret = await AsyncStorage.getItem('@ApiKeysStore:apiSecret');
    } catch (e) {
      console.log(e);
    }
  }

  @computed get apiKeysExist() {
    return this.apiKey && this.apiSecret;
  }
}
```

The store is pretty simple, it has two observable properties (`apiKey` and `apiSecret`), actions to set those properties and functions to save and load those keys with `AsyncStorage`.

## Getting Data From API

`BinanceApiStore` has reference to `ApiKeysStore`, so it can use the keys to access Binance API.

`BinanceApiStore` has a function to get account data (that has info on amounts of owned cryptos) and a function to get current tickers (containing price for every crypto).

It updates it's observable properties and provides a bunch of computed properties so we can display our data.

```js
/* Imports ommited */

export default class BinanceApiStore {
  constructor(apiKeysStore){
    this.apiKeysStore = apiKeysStore;
  }

  @observable apiKeysStore = null;
  @observable balances = [];
  @observable oldBalances = [];
  @observable tickers = [];

  @computed get tickersMap() {
    /* Function content ommited */
  }

  @computed get oldBalancesMap() {
    /* Function content ommited */
  }

  @computed get computedBalances() {
    /* Function content ommited */
  }

  @action setTickers(tickers) {
    this.tickers = tickers;
  }

  @action setBalances(balances) {
    this.balances = balances;
  }

  @action setOldBalances(balances) {
    this.oldBalances = balances;
  }

  async loadBookTickers() {
    /* Function content ommited */
  }

  async loadAccountData() {
    /* Function content ommited */
  }

  async loadOldComputedBalances() {
    const balancesJson = await AsyncStorage.getItem('@BinanceApiStore:oldComputedBalances');
    const balances = JSON.parse(balancesJson)
    this.setOldBalances(balances)
  }

  saveComputedBalancesDisposer = autorunAsync(() => {
    this.computedBalances.length && AsyncStorage.setItem('@BinanceApiStore:oldComputedBalances',
      JSON.stringify(this.computedBalances));
  }, 0)
}
```

Also it stores old computed values to `AsyncStorage` and allows to calculate difference with the last time you checked your balances.

## Displaying Data

Here is the `HomeScreen` layout.

```html
/* Imports ommited */

/* Styles ommited */

@inject("apiKeysStore", "binanceApiStore")
@observer
export default class HomeScreen extends Component {
  async componentDidMount() {
    const { apiKeysStore, binanceApiStore, navigation } = this.props;

    await apiKeysStore.loadApiKeys();
    try {
      await binanceApiStore.loadBookTickers();
      await binanceApiStore.loadAccountData();
      await binanceApiStore.loadOldComputedBalances();
    } catch (e) {
      navigation.navigate("Profile");
    }
  }

  render() {
    const { binanceApiStore, navigation } = this.props;

    return (
      <View style={styles.container}>
        <CurrenciesListHeader />
        <FlatList
          style={styles.list}
          data={binanceApiStore.computedBalances}
          keyExtractor={item => item.asset}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <SymbolAndAmount style={styles.itemSection} item={item} />
              <AmountInBtcAndUsd
                style={styles.itemSection}
                volUsd={item.amountInUsd}
                volBtc={item.amountInBtc}
              />
              <ChangePercentage
                style={styles.itemSection}
                value={item.priceChange}
              />
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.secretsButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.secretsButtonText}>Set API_KEY & API_SECRET</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

First we make `ApiKeyStore` load the API keys, then we `try` to load the account and tickers data and if we get anerror – we navigate user to `ProfileScreen` to enter valid credentials.

When eveything is fine and we got the `computedBalances` we display them using `FlatList`. We'll take closer look on rendered components in last article where we'll cover them with view tests using `Enzyme`.

## Summary

In this article I ommited a lot of code, we'll take a closer look on our stores in next article when we'll cover them with tests.
