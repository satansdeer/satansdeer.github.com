---
title: CryptoKitties Clone Part 2 Adding An Auction
date: 2018-03-19T02:58:45.284Z
categories: js react ethereum dapps erc721
image: erc721-2.jpg
---

In [last part](https://maksimivanov.com/posts/gradient-coin-tutorial) we created our own non-fungible token. For the sake of simplicity, we didn't create as many fields as CryptoKitties have and went with just 2. Inner and outer color of our GradientToken. In this part, we'll add an auction to be able to trade them.

## How Will It Work

We'll use a separate contract to manage trading of our GradientToken. It will have the following interface:

* `createAuction(_tokenId, _price, _seller)` - creates new auction. Transfers the token to itself until the auction is ended.
* `bid(_tokenId)` - bids, if everything is fine and the size of the bid was bigger than auction price – transform token to buyer and money to the seller.
* `cancelAuction(_tokenId)` - cancels the auction, returns token to original owner.

So when you want to sell your token - you create an auction and then it waits for the successful bid or for cancel.

### Create The Auction Contract

Create file `TokenAuction.sol` in your `contracts` folder. It should have the following content:

```js
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TokenAuction {
  ERC721 public nonFungibleContract;

  function TokenAuction(address _nftAddress) public {
    nonFungibleContract = ERC721(_nftAddress);
  }
}
```

Here we imported an `ERC721` token interface from `zeppelin-solidity` lib and defined a contract that accepts __non-fungible token__ address and assigns it to a public variable `nonFungibleContract`.

We need to have a reference to the __non-fungible token__ contract to be able to call it's methods, like `transfer`.

Let's add a test to check if it assigns the address successfully. Create file `TokenAuctionTest.js` in `test` folder:

```js
const GradientToken = artifacts.require("GradientToken");
const TokenAuction = artifacts.require("TokenAuction");

contract("Auction", accounts => {
  it("Should accept nft on creation", async () => {
    let nft = await GradientToken.new();
    let auction = await TokenAuction.new(nft.address);
    const nftAddr = await auction.nonFungibleContract();
    assert.equal(nftAddr, nft.address);
  });
});
```

Run the tests:

```sh
truffle test test/TokenAuctionTest.js
```

### Making Auctions

We need to be able to create new auctions using `tokenId` and `price`. Let's define a method for it and required variables.

For every auction we need to store required price and seller address. Let's define a data type for our auctions, add this to your `TokenAuction` contract:

```js
struct Auction {
  address seller;
  uint128 price;
}
```

Every auction should be associated with specific token, define a mapping:

```js
mapping (uint256 => Auction) public tokenIdToAuction;
```

We made it `public` so Solidity will automatically generate getter for it.

Now we can define a function that will take ownership of the token and create an associated auction:

```js
function createAuction( uint256 _tokenId, uint128 _price ) public {
  nonFungibleContract.takeOwnership(_tokenId);
  Auction memory _auction = Auction({
     seller: msg.sender,
     price: uint128(_price)
  });
  tokenIdToAuction[_tokenId] = _auction;
}
```

First, this function calls the `ERC721` method `takeOwnership`. This method transfers ownership if the transfer was approved for a specific contract. You can approve transfer using `approve` method. 

Then we create a new instance of our `Auction` and assign it to temporal in-memory variable `_auction`. And finally, we make a mapping of this auction to our `_tokenId`.

By this moment your `TokenAuction.sol` should look like this:

```js
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TokenAuction {
  ERC721 public nonFungibleContract;

  struct Auction {
    address seller;
    uint128 price;
  }

  mapping (uint256 => Auction) public tokenIdToAuction;

  function TokenAuction( address _nftAddress ) public {
    nonFungibleContract = ERC721(_nftAddress);
  }

  function createAuction( uint256 _tokenId, uint128 _price ) public {
    nonFungibleContract.takeOwnership(_tokenId);
    Auction memory _auction = Auction({
       seller: msg.sender,
       price: uint128(_price)
    });
    tokenIdToAuction[_tokenId] = _auction;
  }
}
```

Let's add tests for this function. We want to check that `TokenAuction` claims the ownership of the token and that it creates an auction associated with that token.

Add the following block to your `test/TokenAuctionTest.js`

```
describe("createAuction", () => {
  let nft, auctionContract, tokens;

  before(async () => {
    nft = await GradientToken.new();
    auctionContract = await TokenAuction.new(nft.address);

    await nft.mint("#ff00dd", "#ddddff");
    tokens = await nft.tokensOf(accounts[0]);

    await nft.approve(auctionContract.address, tokens[0]);
    await auctionContract.createAuction(tokens[0], 100);
  });

  it("Should take ownership of a token", async () => {
    const tokenOwner = await nft.ownerOf(tokens[0]);
    assert.equal(tokenOwner, auctionContract.address);
  });

  it("Should create new auction", async () => {
    const auction = await auctionContract.tokenIdToAuction(tokens[0]);
    assert.equal(auction[0], accounts[0]);
    assert.equal(auction[1].toNumber(), 100);
  });
});
```

In it's `before` block we initialize our contracts, mint new `GradientToken`, approve it for transferring to auction and then call the `createAuction` method. Two `it` blocks check that token ownership was transferred successfully and that auction was created and is stored in `tokenIdToAuction` map respectively.

### Making Bid

Ok, we are done with creating auctions – let's add the `bid` method.

This method should check if bid value is bigger or equal to auction price and if yes – transfer token to new owner and remove auction.

Add this function to `contracts/TokenAuction.sol`:

```js
function bid( uint256 _tokenId ) public payable {
  Auction memory auction = tokenIdToAuction[_tokenId];
  require(auction.seller != address(0));
  require(msg.value >= auction.price);

  address seller = auction.seller;
  uint128 price = auction.price;

  delete tokenIdToAuction[_tokenId];

  seller.transfer(price);
  nonFungibleContract.transfer(msg.sender, _tokenId);
}
```

Let's go line by line. First, we get the auction representation from our `tokenIdToAuction` map. Then we check that auction seller is non-zero address. It's needed because of how solidity maps work. If there would no `auction` by that id – it would still return the struct, but all the values would be zero.

Then we check if `msg.value` is bigger or equal to the `auction.price`. Our function has `payable` modifier that allows this function to receive money. The received amount can be accessed through `msg.value`

After that we temporarily save seller address and price and remove the auction, preventing further bids to it. Then we transfer money to the seller and transfer the `nft` to the bidder.

### Canceling Auction

Ok, we can make auctions and bid, time to add function to cancel auctions.

```js
function cancel( uint256 _tokenId ) public {
  Auction memory auction = tokenIdToAuction[_tokenId];
  require(auction.seller == msg.sender);

  delete tokenIdToAuction[_tokenId];

  nonFungibleContract.transfer(msg.sender, _tokenId);
}
```

Here we also load the auction but now we don't need to check that `auction.seller` is non-zero because we check if it's equal to `msg.sender` anyway. We want only auction creator to be able to cancel auctions.

Then we delete the auction and send the token back to the seller (which is `msg.sender` in our case).

If you followed the tutorial your `contracts/TokenAuction.sol` should look like this:

```js
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract TokenAuction {
  ERC721 public nonFungibleContract;

  struct Auction {
    address seller;
    uint128 price;
  }

  mapping (uint256 => Auction) public tokenIdToAuction;

  function TokenAuction( address _nftAddress ) public {
    nonFungibleContract = ERC721(_nftAddress);
  }

  function createAuction( uint256 _tokenId, uint128 _price ) public {
    nonFungibleContract.takeOwnership(_tokenId);
    Auction memory _auction = Auction({
       seller: msg.sender,
       price: uint128(_price)
    });
    tokenIdToAuction[_tokenId] = _auction;
  }

  function bid( uint256 _tokenId ) public payable {
    Auction memory auction = tokenIdToAuction[_tokenId];
    require(auction.seller != address(0));
    require(msg.value >= auction.price);

    address seller = auction.seller;
    uint128 price = auction.price;

    delete tokenIdToAuction[_tokenId];

    seller.transfer(price);
    nonFungibleContract.transfer(msg.sender, _tokenId);
  }

  function cancel( uint256 _tokenId ) public {
    Auction memory auction = tokenIdToAuction[_tokenId];
    require(auction.seller == msg.sender);

    delete tokenIdToAuction[_tokenId];

    nonFungibleContract.transfer(msg.sender, _tokenId);
  }
}
```

### Yay, We Have An Auction

You can check out the code related to this tutorial [here](https://github.com/satansdeer/gradient-token-tutorial)

In next chapter, we'll add frontend and have a fully functional game on ethereum network.
