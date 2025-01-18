import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import '../styles/ConnectWallet.css'

let web3 = null; // Exportable web3 instance
const sepoliaChainId = 11155111; // Sepolia network chain ID

const ConnectWallet = () => {
  const [address, setAddress] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);

  

  useEffect(() => {
    // Initialize Web3Modal on component mount
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            [sepoliaChainId]: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`, // Replace with your Infura Project ID
          },
        },
      },
    }

    const modal = new Web3Modal({
      // cacheProvider: true, // Automatically reconnect if previously connected
      providerOptions,
    });

    setWeb3Modal(modal);

    // Automatically connect if wallet was cached
    // if (modal.cachedProvider) {
    //   connectWallet()
    // }
  }, []);

  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect(); // Request wallet connection
      web3 = new ethers.BrowserProvider(instance);

      const accounts = await web3.listAccounts(); // Fetch connected accounts
// if (accounts.length === 0) {
//   throw new Error("No accounts found. Please connect your wallet.");
// }


      const network = await web3.getNetwork();
      if (Number(network.chainId) !== sepoliaChainId) {
        alert("Please switch to the Sepolia network.");
        throw new Error("Not connected to Sepolia network.");
      }

      const signer = await web3.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);

    } catch (error) {
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setAddress(null);
      web3 = null;
    }
  };

  const formatAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "Connect Wallet";

  return (
    <>
    <div className="connect-wallet">
      <button
        onClick={address ? disconnectWallet : connectWallet}>
        {formatAddress(address)}
      </button>
    </div>
    
    </>
    
  );
};

export { web3 };
export default ConnectWallet;
