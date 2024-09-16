const { ethers } = require("hardhat");

// Replace this with your deployed contract address
const contractAddress = "http://127.0.0.1:8545/";

async function main() {
  // Get the contract factory
  const MyAuction = await ethers.getContractFactory("MyAuction");

  // Attach to the deployed contract
  const myAuction = await MyAuction.attach(contractAddress);

  // Call a function on your contract
  try {
    const result = await myAuction.someFunction(); // Replace `someFunction` with an actual function from your contract
    console.log("Function result:", result);
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
