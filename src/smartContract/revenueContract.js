import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../smartContract/constant";

export const useRevenueContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  // Initialize ethers and the contract
  useEffect(() => {
    const initEthers = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);  // Request MetaMask accounts
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
          const account = await signer.getAddress();
          const network = await provider.getNetwork();

          setProvider(provider);
          setSigner(signer);
          setContract(contract);
          setCurrentAccount(account);
          setNetwork(network);

          // Listen for account or network changes
          window.ethereum.on("accountsChanged", handleAccountChange);
          window.ethereum.on("chainChanged", handleChainChange);

        } catch (error) {
          console.error("Error connecting to contract:", error);
          alert(`Connection error: ${error.message}`);
        }
      } else {
        alert("MetaMask not detected. Please install MetaMask.");
      }
    };

    initEthers();

    return () => {
      // Clean up event listeners
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      }
    };
  }, []);

  const handleAccountChange = async (accounts) => {
    if (accounts.length > 0) {
      try {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const account = await signer.getAddress();
  
        setSigner(signer);
        setContract(contract);
        setCurrentAccount(account);
      } catch (error) {
        console.error("Error handling account change:", error);
      }
    } else {
      setCurrentAccount(null);
      setSigner(null);
      setContract(null);
    }
  };

  const handleChainChange = () => {
    window.location.reload(); // Reload the page on network change
  };

  // Function to handle deposit revenue
  const depositRevenue = async (amount) => {
    if (contract) {
      try {
        const tx = await contract.depositRevenue({
          value: ethers.utils.parseEther(amount.toString()),
        });
        await tx.wait();
        alert("Deposit successful!");
      } catch (error) {
        console.error("Deposit failed:", error);
        alert(`Deposit failed: ${error.message}`);
      }
    } else {
      alert("Contract not initialized");
    }
  };

  // Function to handle withdraw revenue
  const withdrawRevenue = async () => {
    if (contract) {
      try {
        const tx = await contract.withdrawRevenue();
        await tx.wait();
        alert("Withdraw successful!");
      } catch (error) {
        console.error("Withdraw failed:", error);
        alert(`Withdraw failed: ${error.message}`);
      }
    } else {
      alert("Contract not initialized");
    }
  };

  return {
    provider,
    signer,
    contract,
    currentAccount,
    network,
    depositRevenue,
    withdrawRevenue,
  };
};
