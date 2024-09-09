import React, { useState, useEffect } from 'react';
import { generateMnemonic, setWallet } from '../hooks/WalletService.ts';

interface CreateWalletProps {
  onProceed: () => void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ onProceed }) => {
  const [mnemonic, setMnemonic] = useState('');

  const createWallet = async () => {
    const mnemonic = generateMnemonic();
    setWallet(mnemonic.keyPair.publicKey, mnemonic.keyPair.privateKey);
    setMnemonic(mnemonic.mnemonic);
    return mnemonic.keyPair.privateKey;
  };
  
  useEffect(() => {
    (async () => {
      await createWallet();
    })()
  }, []);

  return (
    <div className="create-wallet-container">
      <h2>Create New Wallet</h2>
      <div className="mnemonic-display">
        <p>{mnemonic}</p>
      </div>
      <button className="btn btn-primary" onClick={onProceed}>Proceed to Wallet</button>
    </div>
  );
};

export default CreateWallet;