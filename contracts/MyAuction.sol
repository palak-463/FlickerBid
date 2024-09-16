// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyAuction {
    address public topBidder;
    uint public topBid;
    uint public auctionDeadline;
    uint public candleDeadline;
    bool public auctionFinished;
    address public contractOwner;

    mapping(address => uint) public pendingReturns;

    event AuctionComplete(address winner, uint topBid);
    event NewTopBid(address bidder, uint amount);

    constructor(uint bidTime, uint candleTime) {
        contractOwner = msg.sender;
        auctionDeadline = block.timestamp + bidTime;
        candleDeadline = block.timestamp + candleTime;
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only owner can call this");
        _;
    }

    function placeBid() public payable {
        require(block.timestamp <= auctionDeadline, "Auction over.");
        require(msg.value > topBid, "Bid not high enough.");
        require(block.timestamp < candleDeadline, "Candle out, bids closed.");

        if (topBid != 0) {
            pendingReturns[topBidder] += topBid;
        }

        topBidder = msg.sender;
        topBid = msg.value;
        emit NewTopBid(msg.sender, msg.value);
    }

    function finishAuction() public onlyOwner {
        require(block.timestamp >= auctionDeadline, "Auction still going.");
        require(!auctionFinished, "Auction already finished.");

        auctionFinished = true;
        emit AuctionComplete(topBidder, topBid);

        payable(contractOwner).transfer(topBid);
    }

    function getMyRefund() public {
        uint amount = pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw.");

        pendingReturns[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function isCandleOut() public view returns (bool) {
        return block.timestamp >= candleDeadline;
    }
}
