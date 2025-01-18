async function main() {
  // Get the contract factory
  const YonderMarketplace = await ethers.getContractFactory("YonderMarketplace");

  // Deploy the contract
  const yonderMarketplace = await YonderMarketplace.deploy();

  // Wait for the deployment to be mined
  await yonderMarketplace.deployed();

  console.log("YonderMarketplace deployed to:", yonderMarketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });