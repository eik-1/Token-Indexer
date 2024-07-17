import { createContext, useState, useEffect, useContext } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const IndexerContext = createContext();

function IndexerProvider({ children }) {
  const { address, isConnected } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [queryAddress, setQueryAddress] = useState("");
  const [hasQueried, setHasQueried] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [results, setResults] = useState([]);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  useEffect(() => {
    if (isConnected) {
      setConnectedAddress(address);
      getTokenBalance();
    }
  }, [isConnected, address]);

  function handleAddressChange(e) {
    setQueryAddress(e.target.value);
    setIsValid(validateEthAddress(e.target.value));
  }

  const config = {
    apiKey: import.meta.env.VITE_ALCHEMY_KEY,
    network: Network.ETH_SEPOLIA,
  };

  const alchemy = new Alchemy(config);

  async function getTokenBalance() {
    setTokenDataObjects([]);
    setIsLoading(true);

    let data;

    if (queryAddress !== "") {
      data = await alchemy.core.getTokenBalances(queryAddress);
      console.log("I am queried");
      setResults(data);
    } else if (connectedAddress !== "") {
      data = await alchemy.core.getTokenBalances(connectedAddress);
      console.log("I am connected");
      setResults(data);
    }

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
    setIsLoading(false);
  }

  function validateEthAddress(address) {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <IndexerContext.Provider
      value={{
        isLoading,
        queryAddress,
        hasQueried,
        isValid,
        results,
        tokenDataObjects,
        getTokenBalance,
        handleAddressChange,
      }}
    >
      {children}
    </IndexerContext.Provider>
  );
}

function useIndexer() {
  const context = useContext(IndexerContext);
  if (!context) {
    throw new Error("useIndexer must be used within a IndexerProvider");
  }
  return context;
}

export { IndexerProvider, useIndexer };
