import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CandleAuction from './contracts/MyAuction.json';

const contractAddress = 'http://127.0.0.1:8545/'; // Replace with your contract address

function App() {
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState('');
  const [newBid, setNewBid] = useState('');

  useEffect(() => {
    const fetchAuctionData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, CandleAuction.abi, provider);

      const highestBid = await contract.highestBid();
      const highestBidder = await contract.highestBidder();

      setHighestBid(ethers.utils.formatEther(highestBid));
      setHighestBidder(highestBidder);
    };

    fetchAuctionData();
  }, []);

  const handleBid = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, CandleAuction.abi, signer);

    const transaction = await contract.bid({ value: ethers.utils.parseEther(newBid) });
    await transaction.wait();

    const highestBid = await contract.highestBid();
    const highestBidder = await contract.highestBidder();

    setHighestBid(ethers.utils.formatEther(highestBid));
    setHighestBidder(highestBidder);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Candle Auction</h1>
        <p>Highest Bid: {highestBid} ETH</p>
        <p>Highest Bidder: {highestBidder}</p>
        <input
          type="text"
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
          placeholder="Enter bid amount in ETH"
        />
        <button onClick={handleBid}>Place Bid</button>
      </header>
    </div>
  );
}

export default App;
