---
title: Ethereum Distributed App With React Tutorial – Part 2
date: 2018-02-14T05:58:45.284Z
categories: Ethereum
image: react_ethereum_part_2.jpg
---

So, we have a token. Time to create front end part and try to send it between accounts.

This article has two parts:

* [How to create ERC20 token](/posts/ethereum-react-dapp-tutorial)
* [How to create ReactJS front end for your DAPP (this one)](#)

Go read the first part if you missed it, you'll learn how to create a token and run local ethereum network.

## Creating React App

We'll use `create-react-app` to bootstrap our application. Modern versions of `npm` come with `npx` package that allows to run scripts without installing them:

```sh
npx create-react-app front
```

Now go to this folder and create a symlink to our `build` folder, where we have our compiled contracts:

```sh
cd front/src
ln -s ../../build/contracts contracts
```

By default `react-scripts` don't allow to import stuff outside the `src` folder. We fixed it by making that symlink.

## Set Up Drizzle

First we need to install dependencies:

```sh
yarn add redux drizzle drizzle-react drizzle-react-components
```

Redux is drizzle-react dependency. Drizzle-react-components allow to create basic interface in a few seconds.

Open the `front/src/index.js` file and make following changes:

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { DrizzleProvider } from "drizzle-react";

// Import contract
import TutorialToken from "./contracts/TutorialToken.json";

console.log(TutorialToken);

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545"
    }
  },
  contracts: [TutorialToken],
  events: {}
};

ReactDOM.render(
  <DrizzleProvider options={options}>
    <App />
  </DrizzleProvider>,
  document.getElementById("root")
);
registerServiceWorker();
```

Here we imported `DrizzleProvider` from `drizzle-react` and provided it with required options.

`DrizzleProvider` works a lot like Redux provider, and is actually based on it.

It allows us to use `drizzleConnect` to inject data from drizzle state to props.

## Create The Main Screen

Open the `front/src/App.js` and make it look like this:

```html
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { drizzleConnect } from "drizzle-react";
import { ContractData, ContractForm } from "drizzle-react-components";

class App extends Component {
  render() {
    const { drizzleStatus, accounts } = this.props;

    if (drizzleStatus.initialized) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Tutorial Token</h1>
            <p>
              <strong>Total Supply</strong>:{" "}
              <ContractData
                contract="TutorialToken"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                contract="TutorialToken"
                method="symbol"
                hideIndicator
              />
            </p>
            <p>
              <strong>My Balance</strong>:{" "}
              <ContractData
                contract="TutorialToken"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />
            </p>
            <h3>Send Tokens</h3>
          </header>
          <div className="App-intro">
            <ContractForm
              contract="TutorialToken"
              method="transfer"
              labels={["To Address", "Amount to Send"]}
            />
          </div>
        </div>
      );
    }

    return <div>Loading dapp...</div>;
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    TutorialToken: state.contracts.TutorialToken
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;
```

Here we used `drizzleConnect` to get values from drizzle state. Check the `mapStateToProps`, we need accounts to get accounts controlled by current node. In our case there will be only one account – the one that is currently active in MetaMask.

We need `drizzleStatus` to avoid calling uninitialized `web3` instance.

Finally we need `TutorialToken` contract reference, to be able to call it's methods.

## Drizzle React Components

In this example I used `drizzle-react-components`: `ContractForm` and `ContractData`. They allow to display contract related info and call it's methods.

After checking their internals I can't recommend using them. `drizzle-react-components` depend on `purecss` and also don't give much freedom in making custom layout for your app.

## Testing the application

If you read the first part of the article – you should already have the local ethereum network running. If not – I highly recommend to do it.

Download and install the MetaMask browser extension.

After you've done it – connect to local network. In our case it will be `https://localhost:7545`.

![Metamask image](/metamask_1.png)

Now import new user using private key. You can get private key by clicking on key icon in ganache.

Use the key of the first account. As you remember this is the account that got all the initial Tutorial Tokens.

Reload the page. You should see that you have a bunch of Tutorial Tokens.
 
Copy the any other wallet address from ganache and try to send it using the form.

![Tutorial Token Wallet](/tutorial_token_wallet.png)

## Where To Go Next

If you feel lazy – here is the repo with all the steps done: [https://github.com/satansdeer/ethereum-token-tutorial](https://github.com/satansdeer/ethereum-token-tutorial)

This is it. Now you can create your own tokens with little to no effort. Use your new power wisely.

Now you can [add authorization](https://maksimivanov.com/posts/firebase-react-tutorial) to this app and build the whole ICO dashboard around it.

Stay tuned, I'm going to make more tutorials about Ethereum and DAPPs.

Subscribe to my mailing list to not miss other articles:
<p>
  <div id="root"></div>
  <script type="text/javascript" src="/assets/javascripts/bundle.js" charset="utf-8"></script>
</p>
