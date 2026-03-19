import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28", // Upgraded to v0.8.28 to match PVM semantics requirement
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    polkadotHub: {
      url: process.env.POLKADOT_RPC_URL || "https://eth-asset-hub-paseo.dotters.network",
      chainId: 420420417,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      polkadotHub: process.env.BLOCKSCOUT_API_KEY || "empty" // Blockscout doesn't require a strict API key
    },
    customChains: [
      {
        network: "polkadotHub",
        chainId: 420420417,
        urls: {
          apiURL: "https://explorer-eth-asset-hub-paseo.dotters.network/api",
          browserURL: "https://explorer-eth-asset-hub-paseo.dotters.network/"
        }
      }
    ]
  }
};

export default config;
