import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../smartContract/constant";

export const useRevenueContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initEthers = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();

          setProvider(provider);
          setSigner(signer);

          // Set up listeners
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
    window.location.reload();
  };

  const depositRevenue = async (amount) => {
    if (signer) {
      const depositAmount = parseFloat(amount);
      if (depositAmount < 1) {
        alert("Minimum deposit must be at least 1 ETH");
        return;
      }

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

  const withdrawRevenue = async () => {
    if (signer) {
      try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.withdrawRevenue();
        await tx.wait();
        alert("Withdraw successful!");
      } catch (error) {
        console.error("Withdraw failed:", error);
        // Check if the error is due to the 30-day restriction
        if (error.code === 'CALL_EXCEPTION') {
          alert("Cannot withdraw funds till after a minimum of 30 days");
        } else {
          alert(`Withdraw failed: ${error.message}`);
        }
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
