---
layout: post
title: CryptoKitties Clone Part 3 Adding Frontend
date:   2018-03-28 04:58:45 +0300
categories: js react ethereum dapps erc721
image: erc721-3.jpg
---

In [last part](http://maksimivanov.com/posts/gradient-coin-tutorial-part-2) we added an auction contract. Now we can buy and sell our GradientTokens. Let's add some nice UI for that.

This is what we'll be building:

![gradient token app preview](/assets/images/gradient_preview.png)

## Create React App

Let's start by bootstrapping the frontend with `create-react-app`. From your projects root call:

```sh
create-react-app front
cd front
```

Create react app scripts won't allow importing from outside the `src` folder. Create a symlink to contract artifacts.o

```sh
ln -s ../../build/contracts src/contracts
```

I'm going to use `truffle-contract` as an abstraction over `web3` and `mobx` to manage all the business logic. Install the dependencies:

```sh
yarn add mobx mobx-react truffle-contract
```

## Update Migrations

First, we need to get the deployed contracts addresses. Let's modify our migration so it will save the addresses to a JSON file.

First, we'll deploy `GradientToken` and then pass it's address to `TokenAuciton` on deploy. After both contracts are deployed – we get their addresses and save to a JSON file in `front/src` folder.

Make your `migrations/2_deploy_contract.js` look like this:

```js
const GradientToken = artifacts.require("GradientToken");
const TokenAuction = artifacts.require("TokenAuction");
const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  const gradientToken = await deployer.deploy(GradientToken);
  const auctionContract = await deployer.deploy(
    TokenAuction,
    GradientToken.address
  );
  const addresses = {
    tokenAddress: GradientToken.address,
    auctionAddress: TokenAuction.address
  };

  await writeFile(
    path.join(__dirname, "..", "front", "src", "addresses.json"),
    JSON.stringify(addresses)
  );
};
```

Try to run the migrations. If you had them run before - run with `--reset` option.

```sh
truffle migrate --reset
```

Check the `front/src` folder. It should have `addresses.json`.

## Connect To Ethereum Network

Now we need to initialize the `truffle-contract`. It needs the `provider` that it will use to connect to ethereum network and contract addresses associated with deployed contracts.

Create the `front/src/utils` folder and create `getProvider.js` there with following contents:

```sh
import Web3 from "web3";

const getProvider = () => {
  return new Web3.providers.HttpProvider("http://localhost:7545");
};

export default getProvider;
```

Here we connect directly to our local network. You can also use the provider injected to `window` object by __Metamask__. We'll just use `HttpProvider` for simplicity.

Let's use our `getProvider` function. Create `front/src/utils/getGradientContractInstance` with following content:

```js
import contract from "truffle-contract";
import getProvider from "utils/getProvider";
import GradientTokenArtifact from "contracts/GradientToken.json";
import addresses from "../addresses.json";

const { tokenAddress } = addresses;

export default async function getGradientContractInstance() {
  const gradientTokenContract = contract(GradientTokenArtifact);
  gradientTokenContract.setProvider(getProvider());
  const gradientTokenInstance = await gradientTokenContract.at(tokenAddress);
  return gradientTokenInstance;
}
```

Here we initialize `truffle-contract` with JSON artifact, set provider and connect our contract to the deployed instance using the address from `addresses.json`.

Now we have a utility function to get the contract instance – let's use the mobx store to store it.

Create `front/src/stores/ContractsStore.js` with following contents:

```js
import { observable, decorate, action } from "mobx";
import getGradientContractInstance from "utils/getGradientContractInstance";

class ContractsStore {
  gradientTokenInstance = null;

  async setup() {
    this.setGradientTokenInstance(await getGradientContractInstance());
  }

  setGradientTokenInstance(gradientTokenInstance) {
    this.gradientTokenInstance = gradientTokenInstance;
  }
}

export default decorate(ContractsStore, {
  gradientTokenInstance: observable,
  setGradientTokenInstance: action
});
```

The only function of this store is to have an observable reference to `gradientTokenInstance`. Initially it `null` but after `setup` method is called it gets the instance using our `getGradientContractInstance` utility function.

`gradientTokenInstance` is observable so we can derive changes from it in other classes. Let's create another mobx store.

## Using The Contract

Create file `front/src/stores/GradientTokenStore`. This token will be responsible for accessing contract methods.

```js
import { observable, action, decorate, computed, when } from "mobx";
import randomColor from "utils/randomColor";

class GradientTokenStore {
  tokens = [];
  owner = null;
  isLoading = true;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.gradientTokenInstance, this.setup);
  }

  get gradientTokenInstance() {
    return this.contractsStore && this.contractsStore.gradientTokenInstance;
  }

  setup = async () => {
  }
}

export default decorate(GradientTokenStore, {
  owner: observable,
  tokens: observable,
  isLoading: observable,
  gradientTokenInstance: computed
});
```

Here we defined the `gradientTokenInstance` getter and made it `computed`. Mobx allows to observe `observables` automatically and create `computed` values based on them. You can read more about it in my [Mobx article](http://maksimivanov.com/posts/react-native-mobx-tutorial)

We observe this property in `constructor`, using `when`, so once `gradientTokenInstance` is setup – we call the `setup` method.

## Getting Owner Address

To simplify the process – we'll only use the address of the contract owner. Update the `setup` function:

```js
setup = async () => {
  const owner = await this.gradientTokenInstance.owner();
  this.setOwner(owner);
}
```

Create the `setOwner` method we've just used, add the `owner` class property with the initial value of `null` and add it to the `decorate` wrapper:

```js
class GradientTokenStore {
  tokens = [];
  isLoading = true;
  tokenIndex = 0;
  owner = null;

  // ... Other content

  setOwner(owner) {
    this.owner = owner;
  }
}

export default decorate(GradientTokenStore, {
  owner: observable,
  // ... Other content
});
```

## Fetching Tokens List

Add new method `fetchTokens` to `GradientTokenStore`:

```js
  fetchTokens = async () => {
    const tokens = await this.gradientTokenInstance.tokensOf(this.owner);
    const gradients = await Promise.all(
      tokens.map(async token => {
        return this.gradientTokenInstance.getGradient(token);
      })
    );
    this.setIsLoading(false);
    if (!gradients.length) {
      return;
    }
    this.setTokens(this.indexedTokens(gradients));
  };
```

First, we call our contract method `tokensOf`. It will return an array of token ids, now we need to get associated gradients. We call the `getGradient` method for every id. And in order to wait until all the promises will be resolved - we wrap it into `Promise.all`

After gradients are loaded - we update the `isLoading` attribute, and if `gradients` array is not empty we call the `setTokens` method. `setTokens` is trivial it is just a mobx action that sets the `tokens` attribute:

```js
setTokens(tokens) {
  this.tokens.replace(tokens);
}
```

The `indexedTokens` just adds an index to every gradient – it's needed for `React`. We are going to show our tokens in a list. And list elements in react should have unique `key` prop:

```js
indexedTokens(gradients) {
  return gradients.map(gradient => {
    return {
      gradient,
      index: this.tokenIndex++
    };
  });
}
```

## Minting New Tokens

Now we can show the list of tokens but we can't create new ones. Let's fix it, add the `mintToken` method to our `GradientsTokenStore`:

```js
mintToken = async () => {
  const gradient = ['#fff', '#000'];
  await this.gradientTokenInstance.mint(gradient[0], gradient[1], {
    from: this.owner,
    gas: 170000
  });
  this.appendToken({ gradient, index: this.tokenIndex++ });
};
```

Here I hardcoded the black and white gradient for simplicity.

Important note, here we call the transaction using `httpProvider`. Transactions require gas. As we don't use any kind of wallet here that would automatically calculate the required amount of gas – we set it manually.

After the `mint` method was executed – we append the token to our list of tokens and provide an index to use in react list.

Add the `appendToken` method:

```js
appendToken(token) {
  this.tokens.push(token);
}
```

## Initializing Stores

Great, we are almost done with our business logic. Now we need to instantiate our stores. Create file `front/src/stores/index.js` with following contents:

```js
import ContractsStore from "./ContractsStore";
import GradientTokenStore from "./GradientTokenStore";

const contractsStore = new ContractsStore();
contractsStore.setup();

const gradientTokenStore = new GradientTokenStore(contractsStore);

export default {
  contractsStore,
  gradientTokenStore
};
```

Now modify your `src/App.js` to inject our stores into the app.

```js
import React, { Component } from "react";
import { Provider } from "mobx-react";
import TokensPage from "./TokensPage";
import stores from "./stores";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className="App">
          <TokensPage />
        </div>
      </Provider>
    );
  }
}

export default App;
```

Now our stores will be available from any of the react views.

Making the views is trivial if you are interested – you can check out [the repo](https://github.com/satansdeer/gradient-token)

