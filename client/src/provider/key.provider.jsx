import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(localStorage.getItem("pubKey") || null);

  return (
    <WalletContext.Provider value={{ publicKey }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
