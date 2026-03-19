import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers";
import { formatEther } from "ethers";
import { parseEther } from "ethers";

// internal imports
import { CrowdFundingABI as abi, CrowdFundingAddress as contractAddress } from "./contants";

// -----Fetching the smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(contractAddress, abi, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");

  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline } = campaign;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    console.log(currentAccount);
    try {
      const transaction = await contract.createCampaign(
        currentAccount, // owner
        title,
        description, // description
        ethers.parseUnits(amount, 18),
        new Date(deadline).getTime()
      );

      await transaction.wait();

      console.log("Contract call success", transaction);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const provider = new JsonRpcProvider("https://eth-asset-hub-paseo.dotters.network");
    const contract = fetchContract(provider);

    const campaigns = await contract.getCampaign();
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: formatEther(campaign.target.toString()),
      deadline: campaign.deadline,
      amountCollected: formatEther(campaign.amountCollected.toString()),
      claimed: campaign.claimed,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const provider = new JsonRpcProvider("https://eth-asset-hub-paseo.dotters.network");
    const contract = fetchContract(provider);

    const allCampaigns = await contract.getCampaign();

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    // const currentUser = accounts[0].toLowerCase();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) =>
        campaign.owner === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );
    // "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

    const userData = filteredCampaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: formatEther(campaign.target.toString()),
      deadline: campaign.deadline,
      amountCollected: formatEther(campaign.amountCollected.toString()),
      claimed: campaign.claimed,
      pId: i,
    }));

    return userData;
  };

  const donate = async (pId, amount) => {
    try {
      if (pId === undefined || pId === null)
        throw new Error("Donation ID is undefined");
      if (!amount) throw new Error("Donation amount is undefined");

      const web3Modal = new Web3Modal({ cacheProvider: true });
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const value = ethers.parseEther(amount.toString());

      const campaignData = await contract.donateToCampaign(pId, {
        value,
      });

      await campaignData.wait();
      location.reload;

      return campaignData;
    } catch (error) {
      console.error("donation err", error);
      throw error;
    }
  };

  const getDonations = async (pId) => {
    const provider = new JsonRpcProvider("https://eth-asset-hub-paseo.dotters.network");
    const contract = fetchContract(provider);

    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        console.log("Install Metamask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]); // Auto-set if already connected
      } else {
        console.log("No Account Found");
      }
    } catch (err) {
      console.log("Error while checking wallet connection:", err);
    }
  };

  // to check if the wallet is connected
  const checkIfWalletConnectedd = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (e) {
      console.log("something went wrong while connecing to wallet", e);
    }
  };

  const claim = async (pId) => {
    try {
      const web3Modal = new Web3Modal({ cacheProvider: true });
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const transaction = await contract.claim(pId);
      await transaction.wait();
      location.reload();
      return transaction;
    } catch (error) {
      console.error("claim err", error);
      throw error;
    }
  };

  const refund = async (pId) => {
    try {
      const web3Modal = new Web3Modal({ cacheProvider: true });
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const transaction = await contract.refund(pId);
      await transaction.wait();
      location.reload();
      return transaction;
    } catch (error) {
      console.error("refund err", error);
      throw error;
    }
  };

  // wallet connect function
  const connectWallett = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install Metamask");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log("Error while connecting wallet:", err);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();

    // Optional: Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount("");
        }
      });
    }
  }, []);

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        claim,
        refund,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
