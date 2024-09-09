import React from 'react';

interface WalletOptionsProps {
  onCreateNewWallet: () => void;
  onRecoverWallet: () => void;
}

const WalletOptions: React.FC<WalletOptionsProps> = ({ onCreateNewWallet, onRecoverWallet }) => {
  return (
    <div className="wallet-options-container">
      <h2>Wallet Options</h2>
      <button className="btn btn-primary" onClick={onCreateNewWallet}>Create New Wallet</button>
      <button className="btn btn-secondary" onClick={onRecoverWallet}>Recover Wallet</button>
    </div>
  );
};

export default WalletOptions;