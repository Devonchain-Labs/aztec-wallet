import { AccountWallet } from '@aztec/aztec.js';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WalletContextProps {
  accountWallet: AccountWallet | null;
  privateKey: string;
  setAccountWallet: (wallet: AccountWallet) => void;
  setPrivateKey: (key: string) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accountWallet, setAccountWallet] = useState<AccountWallet | null>(null);
  const [privateKey, setPrivateKey] = useState<string>('');

  return (
    <WalletContext.Provider value={{ accountWallet, privateKey, setAccountWallet, setPrivateKey }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};