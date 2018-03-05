---
layout: post
title: Gradient Coin ERC721 Compliant Ethereum Token Tutorial
date:   2018-03-04 12:58:45 +0300
categories: js react ethereum dapps erc721
image: erc721.jpg
---

__🚧 CAUTION!! THIS ARTICLE IS WIP!! Read at your own risk 🚧.__ If you've read previous articles about Ethereum DAPPs ([First](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial), [Second](http://maksimivanov.com/posts/ethereum-react-dapp-tutorial-part-2)) – you already have your very own __ERC20__ compliant token. Today we'll make oureselves familiar with __ERC721__.

## What Are We Going To Build

We'll build a wallet for unique collectibles: gradient tokens. Every token will be represented as a unique css gradient and will look somewhat like this:

<p>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #BF49D1; background: -webkit-radial-gradient(center,#BF49D1,#06855B); background: -o-radial-gradient(center,#BF49D1,#06855B); background: -moz-radial-gradient(center,#BF49D1,#06855B); background: radial-gradient(ellipse at center, #BF49D1, #06855B); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #6A4AA5; background: -webkit-radial-gradient(center,#6A4AA5,#AD9E64); background: -o-radial-gradient(center,#6A4AA5,#AD9E64); background: -moz-radial-gradient(center,#6A4AA5,#AD9E64); background: radial-gradient(ellipse at center, #6A4AA5, #AD9E64); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #4FFCFC; background: -webkit-radial-gradient(center,#4FFCFC,#21D152); background: -o-radial-gradient(center,#4FFCFC,#21D152); background: -moz-radial-gradient(center,#4FFCFC,#21D152); background: radial-gradient(ellipse at center, #4FFCFC, #21D152); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #BF9175; background: -webkit-radial-gradient(center,#BF9175,#F3BA45); background: -o-radial-gradient(center,#BF9175,#F3BA45); background: -moz-radial-gradient(center,#BF9175,#F3BA45); background: radial-gradient(ellipse at center, #BF9175, #F3BA45); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
<div style="display: inline-block; margin-right: 15px; width: 50px; height: 50px; border-radius: 50%; background: #C82F82; background: -webkit-radial-gradient(center,#C82F82,#5AA976); background: -o-radial-gradient(center,#C82F82,#5AA976); background: -moz-radial-gradient(center,#C82F82,#5AA976); background: radial-gradient(ellipse at center, #C82F82, #5AA976); box-shadow: 1px 8px 10px 0px rgba(50, 50, 50, 0.3);"></div>
</p>

## What Is ERC721

ERC721 describes non-fungible token. Btw it is also knowns as __NFT__, which basically means exactly that (__Non Fungible Token__). Non-fungible means that every token is not equal to any other token. As opposite to ERC20 where all tokens are equal.

Most known example of ERC721 are CryptoKitties, where each kitten is a token described by the ERC721 compliant conrtact with bunch of additional functions.

Most known example of ERC20 therefore is any ICO, as 99% of them are based on ERC20 compliant Ethereum contracts.

Unlike ERC20 you can't just store amount of tokens in a wallet. Every token is unique so you have to store owner of each token instead.

With NFT you want to know several things: 

* How many tokens are in total? 
* How many tokens are in this specific wallet?
* Who owns this specific token?
* What tokens are in this specific wallet?

Also you want to be able to do some actions like: 

* Transfer token to specific wallet
* Request token from specific wallet
* Approve request from specific wallet.

This is it, ERC721 provides functions for all of that.

## ERC721 Interface

So basically ERC721 describes ownership and requires following functions to be implemented:

* _totalSupply()_ - Total amount of emitted tokens.
* _balanceOf( _owner )_ - Amount of tokens in specific `_owner`'s wallet.
* _ownerOf( _tokenId )_ - Returns wallet address of the specific tokeno owner.
* _transfer( _to, _tokenId )_ - Transfers token with `_tokenId` from senders wallet to specific wallet.
* _takeOwnership( _tokenId )_ - Claims the ownership of a given token ID
* _approve( _to, _tokenId )_ - Approves another address to claim for the ownership of the given token ID

Also it defines two events: `Transfer`, and `Approval`.

### Zeppelin ERC721 Implementation

ERC721 compliant contract from [Zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity) provides some additional useful functions:

* _tokensOf( _owner )_ - Returns list of token ID's of specific `_owner`
* _approvedFor( _tokenId )_ - Returns the approved address to take ownership of a given token ID

## Let's Make Our Own

So to build our Gradient Token we'll use Zeppelin's ERC721 template and add one additional function to generate random gradient bacground upon token creation.

Create new project and initialize truffle there:

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

contract GradientToken is ERC721Token {
}
```

__🚧  ARTICLE IS WIP, will add content as it will be ready 🚧__

I love to write tutorials and I want to make them great. Help my by posting comments. If something is unclear – don't hesitate to ask for clarification. If something is incorrect – don't hesitate to correct me. If you have any ideas on what else to add – feel free to contact me.
