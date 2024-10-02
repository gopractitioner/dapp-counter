import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const counterABI = [
  "function increment() public",
  "function decrement() public",
  "function getCount() public view returns (uint256)"
];

const counterAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const counterContract = new ethers.Contract(counterAddress, counterABI, signer);
        setContract(counterContract);
        updateCount(counterContract);
      }
    };
    initContract();
  }, []);

  const updateCount = async (counterContract) => {
    const newCount = await counterContract.getCount();
    setCount(newCount.toNumber());
  };

  const handleIncrement = async () => {
    if (contract) {
      await contract.increment();
      updateCount(contract);
    }
  };

  const handleDecrement = async () => {
    if (contract) {
      await contract.decrement();
      updateCount(contract);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Dapp Counter</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-2xl mb-4">Count: {count}</p>
        <div className="flex space-x-4">
          <button
            onClick={handleIncrement}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Increment
          </button>
          <button
            onClick={handleDecrement}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}