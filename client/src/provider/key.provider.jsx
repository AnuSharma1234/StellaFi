import { createContext, useContext, useEffect, useState, useMemo } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey_] = useState(localStorage.getItem("pubKey"));

  const setPublicKey = (key) =>{
    setPublicKey_(key)
  }

  useEffect(() => {
    if(publicKey){
        localStorage.setItem('pubKey',publicKey)
    }else{
        localStorage.removeItem('pubKey')
    }
  },[publicKey])

  const contextValue = useMemo(
    () => ({
        publicKey,
        setPublicKey
    }),
    [publicKey]
  )

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);