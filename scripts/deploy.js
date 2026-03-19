const hre = require("hardhat");

async function main() {
  console.log("Deploying CrowdFunding contract to Polkadot Hub...");

  // We get the contract to deploy
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.waitForDeployment();

  const contractAddress = await crowdFunding.getAddress();
  console.log("CrowdFunding successfully deployed to:", contractAddress);

  console.log("\n--- Post-Deployment ---");
  console.log("To verify the contract on Polkadot Hub Blockscout, run the following command:");
  console.log(`npx hardhat verify --network polkadotHub ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});