# 🕯️ Flicker Bid

**Flicker Bid** is a Solidity-based implementation of a **Candle Auction** using Hardhat. A candle auction is a type of auction in which the end time is determined by the length of a candle burning, creating an element of unpredictability. This mechanism is aimed at simulating historical candle auctions used during the 17th and 18th centuries.

## ⚡ Features

- **Smart Contract Auction Logic**: Implements a Solidity smart contract to manage the candle auction process.
- **Candle Timer**: The auction randomly selects a time to end the bidding process.
- **Real-Time Bidding**: Allows multiple users to place bids during the auction period.
- **Winner Selection**: Determines the winner based on the highest bid placed before the random end time.

<br>

## ✨ Technologies Used

| Development Environment | Smart Contract  |
| ----------------------- | --------------- |
| Hardhat                 | Solidity        |
| Node.js                 | OpenZeppelin    |
| JavaScript              | Ethers.js       |
| Mocha/Chai              | Hardhat Network |

<br>

## 🎥 Demo Walkthrough

- Start the local Hardhat network.
- Deploy the smart contract using the provided script.
- Start the auction and observe the bidding process.
- The auction will end at a random point, and the highest bidder before that time will be declared the winner.

<br>

## 📚 Resources

- For more information on Candle Auctions, refer to the [Wikipedia page of Candle Auction](https://en.wikipedia.org/wiki/Candle_auction).

<br>

