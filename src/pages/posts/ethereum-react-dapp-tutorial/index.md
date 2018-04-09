---
title: Ethereum Distributed App With React Tutorial
date: 2018-02-13T05:58:45.284Z
categories: js react mobx
image: react_ethereum.jpg
---

ICO's, crypto, blockchain, dapps. Everyone is discussing it nowadays (or at leas heard). Today I'm going to show you how to create your first distributed app on Ethereum blockchain, using ReactJS.

This article has two parts:

* [How to create ERC20 token (this one)](#)
* [How to create ReactJS frontend for your DAPP](/posts/ethereum-react-dapp-tutorial-part-2)

In the end of second article I'll provide a github repo with this project.

## What Are We Going To Build

We'll create our own token that will conform the [ERC20](https://theethereum.wiki/w/index.php/ERC20_Token_Standard) token standard. We'll create a wallet application using ReactJS, that will allow you to play arount with your token using browser with [🦊 Metamask](https://metamask.io/) extension.

![Result](/react_ethereum_result.png)

We'll use [Truffle](http://truffleframework.com/) to compile and deploy our token, [Ganache](http://truffleframework.com/ganache/) to set up the test blockchain aNd [Drizzle](http://truffleframework.com/docs/drizzle/getting-started) to integrate all this with ReactJS frontend.

![Truffle Ganache Drizzle image](/truffle_ganache_drizzle.png)

## About ERC20

ERC20 basically represents fungible token, that means that any token of this kind is equal to any other token of this kind. Like 1$ is always equal to 1$.

Overall this standard reqires to have 6 methods and 2 events defined.

3 of those methods are totally necessary to make a fungible token and a remaining 3 are needed to make it ERC20 compliant (they are needed to do automatic transactions).

### Super Necessary Fungible Token Methods

So if you want to have a coin – you need to know how many coins exist in total, how many coins are in this particular wallet and be able to transfer those coins from one wallet to another. That's practically it and that's what those 3 essential functions do.

* `totalSupply` returns total amount of existing tokens.
* `balanceOf` accepts wallet address and returns balance of this wallet
* `transfer` accepts receivers wallet address and amount of tokens to transfer

Also it needs to define the `Transfer` event that tells *who* sent *what amount of tokens* to *who*.

As you can see, no magic here, and it's totally understandable why do you need to have such methods.

### Remaining Methods

Those methods are needed to execute automated transactions. Like recurring payments, or payments based on some external event. For instance you could make a subscription service based completely on blockchain.

* `allowance` accepts owner and spender wallet addresses and returns the amount of tokens allowed to spender to withdraw automatically.
* `approve` accepts spenders wallet address and amount of tokens. Sets the amount of tokens allowed to for given spender.
* `transferFrom` gets address _from_, address _to_ and amount of tokens to transfer. Executes transfer within limit allowed by the owner of _from_ address.

Also it needs to define the `Approval` that tells that some amount of tokens are approved for some spender.

## Setting Up

To write our contract we need local blockchain and an wallet that will allow us to test the DAPP locally.

First install the [🦊 Metamask](https://metamask.io/) browser extension. We'll need it to interact with our contract in browser.

For local ethereum blockchain I recommend [Ganache](http://truffleframework.com/ganache/). Go and download version for your OS.

Now install Truffle and initialize new project:

```sh
npm install -g truffle
mkdir ethereum-token-tutorial
cd ethereum-token-tutorial
yarn init
truffle init
```

`truffle init` will install all required dependencies and generate 3 folders:

* `contracts` - contain actual contracts. Our token contract will be here.
* `migrations` - migrations are js scripts that deploy your contracts to ethereum network.
* `test` - folder for your tests. JS and Solidity. 

## Writing Contract

We are going to use ERC20 token template provided by [Zeppelin](https://zeppelin.solutions/). It already provides all the required methods we'll only have to set the name, symbol for our token.

Install Zeppelin templates and create new contract file:

```sh
yarn add zeppelin-solidity
touch contracts/TutorialCoin.sol
```

Edit tutorial token contract file so it will look like this:

```js
pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract TutorialToken is StandardToken {
  string public name = 'TutorialToken';
  string public symbol = 'TUT';
  uint8 public decimals = 2;

  uint public INITIAL_SUPPLY = 1000000;

  function TutorialToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
```

Name and symbol allow to identify our token, decimals – determines the minimal fraction of the token. In this case it's 1/100 like cents for $.

`total_supply_` is provided by [BasicToken](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/ERC20/BasicToken.sol) and defines total number of tokens in existence.

In our constructor function `TutorialToken()` we set `total_supply_` equal to `INITIAL_SUPPLY` and assign all newly emitted tokens to the wallet that initiated contract execution.

That's it, now you have your own token. Let's deploy it.

### Compiling And Deploying

Create file `2_deploy_contract.js` in `migrations` folder:

```js
var TutorialToken = artifacts.require("TutorialToken");

module.exports = function(deployer) {
  deployer.deploy(TutorialToken);
};
```

If you haven't done it yet – download [Ganache](http://truffleframework.com/ganache/) and run it. It will start on `7545` port by default.

![Ganache image](/ganache.png)

Now go back to terminal and compile your contract:

```sh
truffle compile
```

Now to be able to deploy contract to local network – in your projects root create `truffle.js` with following content:

```js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
```
As we set only one network – truffle will use it by default. Run the migrations.

```sh
truffle migrate
```

After successful migration you should see new transactions in Ganache:

![Ganache image](/ganache_2.png)

Awesome, your contract is now up and running, let's make simple React app to interact with your token.

See you in the next part, where we'll set up frontend and send our tokens between wallets.

To not miss the article – subscribe to my mailing list:
<p>
  <div id="root"></div>
  <script type="text/javascript" src="/assets/javascripts/bundle.js" charset="utf-8"></script>
</p>
