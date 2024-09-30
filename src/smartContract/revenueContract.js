import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../smartContract/constant";

export const useRevenueContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  // Initialize ethers and the contract
  useEffect(() => {
    const initEthers = async () => {
        if (typeof window.ethereum !== "undefined") {
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); 
            const signer = await provider.getSigner(); 
      
            setProvider(provider);
            setSigner(signer);
      
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
    if (accounts.length === 0) {
      alert("Please connect an account.");
    }
  };

  const handleChainChange = () => {
    window.location.reload(); // Reload the page on network change
  };

  // Function to handle deposit revenue
  const depositRevenue = async (amount) => {
    if (signer) {
      try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.depositRevenue({
          value: ethers.parseEther(amount.toString()),
        });
        await tx.wait();
        alert("Deposit successful!");
      } catch (error) {
        console.error("Deposit failed:", error);
        alert(`Deposit failed: ${error.message}`);
      }
    } else {
      alert("Signer not initialized");
    }
  };

  // Function to handle withdraw revenue
  const withdrawRevenue = async () => {
    if (signer) {
      try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.withdrawRevenue();
        await tx.wait();
        alert("Withdraw successful!");
      } catch (error) {
        console.error("Withdraw failed:", error);
        alert(`Withdraw failed: ${error.message}`);
      }
    } else {
      alert("Signer not initialized");
    }
  };

  return {
    provider,
    signer,
    depositRevenue,
    withdrawRevenue,
  };
};
