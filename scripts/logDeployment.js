const fs = require('fs');
const path = require('path');

// Adjust the path to your JSON file
const myAuctionPath = path.resolve(__dirname, '../artifacts/contracts/MyAuction.sol/MyAuction.json');

// Read the JSON file
const myAuctionData = JSON.parse(fs.readFileSync(myAuctionPath, 'utf8'));

// Log the deployed address
if (myAuctionData.networks && myAuctionData.networks['1337']) {
    console.log("MyAuction deployed at:", myAuctionData.networks['1337'].address);
} else {
    console.error("Deployment address not found in JSON file.");
}
