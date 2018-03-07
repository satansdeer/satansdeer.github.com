---
layout: post
title: 🚧 Gradient Coin ERC721 Compliant Ethereum Token Tutorial
date:   2018-03-04 12:58:45 +0300
categories: js react ethereum dapps erc721
image: erc721.jpg
---

__🚧 CAUTION!! THIS ARTICLE IS WIP!! Read at your own risk 🚧.__ If you've read previous articles about Ethereum DAPPs ([First](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial), [Second](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial-part-2)) – you already have your very own __ERC20__ compliant token. Today we'll make ourselves familiar with __ERC721__.

## What Are We Going To Build

I think everyone already has already heard about cryptokitties. A game based on Ethereum blockchain where you collect and breed adorable kittens:

![cryptokitties](/assets/images/cryptokitties.png)

The game has huge success and a lot of kittens are sold for the crazy amount of money, like hundreds of thousands of dollars.

The game is mostly open-source with a few exceptions (breeding and genetic algorithms).

We'll also do a collectible token but with a lot more simple logic. Our token won't be able to breed, only you as an owner will be able to mint new tokens.

You'll learn how to create non fungible tokens, how to write tests for Ethereum contracts and how to connect them to js frontend.

We'll build a wallet for unique collectibles: gradient tokens. Every token will be represented as a unique css gradient and will look somewhat like this:

<p>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #BF49D1; background: -webkit-radial-gradient(center,#BF49D1,#06855B); background: -o-radial-gradient(center,#BF49D1,#06855B); background: -moz-radial-gradient(center,#BF49D1,#06855B); background: radial-gradient(ellipse at center, #BF49D1, #06855B); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #6A4AA5; background: -webkit-radial-gradient(center,#6A4AA5,#AD9E64); background: -o-radial-gradient(center,#6A4AA5,#AD9E64); background: -moz-radial-gradient(center,#6A4AA5,#AD9E64); background: radial-gradient(ellipse at center, #6A4AA5, #AD9E64); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #4FFCFC; background: -webkit-radial-gradient(center,#4FFCFC,#21D152); background: -o-radial-gradient(center,#4FFCFC,#21D152); background: -moz-radial-gradient(center,#4FFCFC,#21D152); background: radial-gradient(ellipse at center, #4FFCFC, #21D152); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #BF9175; background: -webkit-radial-gradient(center,#BF9175,#F3BA45); background: -o-radial-gradient(center,#BF9175,#F3BA45); background: -moz-radial-gradient(center,#BF9175,#F3BA45); background: radial-gradient(ellipse at center, #BF9175, #F3BA45); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #C82F82; background: -webkit-radial-gradient(center,#C82F82,#5AA976); background: -o-radial-gradient(center,#C82F82,#5AA976); background: -moz-radial-gradient(center,#C82F82,#5AA976); background: radial-gradient(ellipse at center, #C82F82, #5AA976); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
</p>

You will be able to see the list of owned tokens and transfer them between wallets.

In this tutorial I assume that you have basic knowledge about ReactJS and went though my previous tutorials about Ethereum contracts ([First](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial), [Second](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial-part-2))

## Contents

* [What Is ERC721]()
* [Setting Up Truffle Suite]()

## What Is ERC721

ERC721 describes non-fungible token. Btw it is also knowns as __NFT__, which basically means exactly that (__Non Fungible Token__). Non-fungible means that every token is not equal to any other token. As opposite to ERC20 where all tokens are equal.

Most known example of ERC721 is CryptoKitties, where each kitten is a token described by the ERC721 compliant contract with a bunch of additional functions.

Most known example of ERC20, therefore, is any ICO, as 99% of them are based on ERC20 compliant Ethereum contracts.

Unlike ERC20 you can't just store amount of tokens in a wallet. Every token is unique so you have to store owner of each token instead.

With NFT you want to know several things: 

* How many tokens are in total? 
* How many tokens are in this specific wallet?
* Who owns this specific token?
* What tokens are in this specific wallet?

Also, you want to be able to do some actions like: 

* Transfer token to the specific wallet
* Request token from the specific wallet
* Approve request from the specific wallet.

This is it, ERC721 provides functions for all of that.

## ERC721 Interface

So basically ERC721 describes ownership and requires following functions to be implemented:

* _totalSupply()_ - Total amount of emitted tokens.
* _balanceOf( _owner )_ - Amount of tokens in specific `_owner`'s wallet.
* _ownerOf( _tokenId )_ - Returns wallet address of the specific tokens owner.
* _transfer( _to, _tokenId )_ - Transfers token with `_tokenId` from senders wallet to specific wallet.
* _takeOwnership( _tokenId )_ - Claims the ownership of a given token ID
* _approve( _to, _tokenId )_ - Approves another address to claim for the ownership of the given token ID

Also, it defines two events: `Transfer`, and `Approval`.

### Zeppelin ERC721 Implementation

ERC721 compliant contract from [Zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity) provides some additional useful functions:

* _tokensOf( _owner )_ - Returns list of token ID's of specific `_owner`
* _approvedFor( _tokenId )_ - Returns the approved address to take ownership of a given token ID

## Setting Up Truffle Suite

So to build our Gradient Token we'll use Zeppelin's ERC721 template and add one additional function to generate random gradient background upon token creation.

Create a new project and initialize truffle there:

```sh
yarn add global truffle
mkdir gradient-token-tutorial
cd gradient-token-tutorial
yarn init
truffle init
```

Install `zeppelin-solidity` and create our token contract:

```sh
yarn add zeppelin-solidity
touch contracts/GradientToken.sol
```

Open `GradientToken.sol` and add following contents:

```js
pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract GradientToken is ERC721Token {
    string public constant name = "GradientToken";
      string public constant symbol = "GRAD";
}
```
Just defining the token for now.

We inherited it from two contracts: __ERC721Token__ to make it represent a non-fungible token, and from the __Ownable__ contract.

__Ownable__ allows managing authorization. It assigns ownership to deployer (when the contract is deployed) and adds _modifier_ __onlyOwner__ that allows you to restrict certain methods only to contract owner. Also, you can transfer ownership.

Add the `2_deploy_contract.js` migration to `migrations` folder:

```js
var GradientToken = artifacts.require("GradientToken");

module.exports = function(deployer) {
    deployer.deploy(GradientToken);
};
```

We add the index in the beginning of migrations name so truffle can tract successful migrations and not run them twice.

## Add Tests

Truffle uses `Mocha` as a testing framework, with one additional scope: `contract()`.

`contract()` is very similar to `describe()` but it provides some additional features:

* Before each `contract()` block you contract are re-deployed to Ethereum network. So you have clean contract state.
* It provides a list of `accounts` that you can use to write tests.

Truffle uses `Chai` as assertion framework, you can check the documentation [here](chaijs.com/api/)

Create `GradientTokenTest.js` in `/test` directory and add following content:

```js
const GradientToken = artifacts.require("GradientToken");

contract("Gradient token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await GradientToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});
```

Note that we first require the `GradientToken` artifact. Which is `json` representation of your token interface. This is the thing that allows you to interact with your contract from javascript code.

This test is unnecessary as this functionality is already tested by the `Ownable` tests in zeppelin library. I've added it only for quick demonstration.

Here we run the `contract` block, that deploys our contract. We wait for the contract to be deployed and request `owner()` which returns owners address. Then we assert that owners address is the same as `account[0]`

When you deploy contracts your first contract will usually be the deployer.

Run the test:

```sh
truffle test
```

The test should pass.

## Add More Functionality

We want to have a gradient associated with every token. We'll use circular gradients represented by two colors.

Solidity allows you to define new types of data in form of structs.

Let's define a struct that will store our gradient representation:

```js
struct Gradient {
  string outer;
  string inner;
}
```

Our `Gradient` struct contains two `string` type fields. Structs in solidity can have other structs as fields, but It is not possible for a struct to contain a member of its own type. This restriction is necessary, as the size of the struct has to be finite.

Now let's define an array of gradients.

In solidity there are two types of arrays: fixed and dynamic. For fixed arrays you should define their length.

For example:

```js
string[7] rainbowColorsArray;
```

We don't know yet how many gradients do we want to create, so let's define `dynamic` array:

```js
Gradient[] gradients;
```

### Minting Gradient Tokens

We want to allow contract owner to mint new __GradientTokens__, let's define the following function:

```js
function mint(string _outer, string _inner) public onlyOwner{
  Gradient memory _gradient = Gradient({ outer: _outer, inner: _inner });
  uint _gradientId = gradients.push(_gradient) - 1;

  _mint(msg.sender, _gradientId);
}
```

First we define an in memory `_gradient` varibale. In memory means that lifespan of this variable will be limited by the execution scope.

There are 3 ways of storing data in Solidity:

* Storage - This is most serious and expensive one. The data will be pesisted between contract function calls.
* Memory - This one is cheaper. Variable will be erased between function calls.
* Stack - This is only for small local variables like `uint` or `string`

By default `stack` is being used. Theere are only two data types you can control kind of storage: 'Struct' and `Array`.

In our case we need this variable only temporarily se we used `memory` storage.

Then we defined `_gradientId` by getting new length of the `gradients` array (the `push` method returns the new length) minus one, so we start from zero.

Finally we call the `_mint` method that we got from `ERC721Token` that we inherit.

This method is internal and it does the following:

1. Checks that the recipient address is valid (not 0), otherwize throws an error
2. Creates a token and assigns it an owner.
3. Fires `Transfer` event.

### Getting Gradient Info

Cool, now let's add a method that will allow us to get gradient data associated with specific token:

```js
function getGradient( uint _gradientId ) public view returns(string outer, string inner){
  Gradient memory _grad = gradients[_gradientId];

  outer = _grad.outer;
  inner = _grad.inner;
}
```

This function is also `public`, also we define it as `view` basically promising to only __VIEW__ stuff and not modify the state.

We defined temporary `memory` variable `_grad` that we got from our `gradients` array by requested `_gradientId`.

Then finally we define the return values `outer` and `inner`. They will be returned as an array.

__🚧  ARTICLE IS WIP, will add content as it will be ready 🚧__

I love to write tutorials and I want to make them great. Help me by posting comments. If something is unclear – don't hesitate to ask for clarification. If something is incorrect – don't hesitate to correct me. If you have any ideas on what else to add – feel free to contact me.

