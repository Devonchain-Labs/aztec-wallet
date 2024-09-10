import React from 'react';
import Button from '../_common/button/Button.tsx';
import styles from "./wallet-options.module.css"

interface WalletOptionsProps {
  onCreateNewWallet: () => void;
  onRecoverWallet: () => void;
}

const WalletOptions: React.FC<WalletOptionsProps> = ({ onCreateNewWallet, onRecoverWallet }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Wallet Options</h2>
      <Button  variant='primary' onClick={onCreateNewWallet} className={styles.buttonsClassName}>Create New Wallet</Button>
      <Button  variant='secondary' onClick={onRecoverWallet} className={styles.buttonsClassName}>Recover Wallet</Button>
    </div>
  );
};

export default WalletOptions;