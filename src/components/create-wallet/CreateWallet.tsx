import React, { useState, useEffect } from 'react';
import { generateMnemonic, setWallet } from '../../hooks/WalletService.ts';
import Button from '../_common/button/Button.tsx';
import styles from "./create-wallet.module.css"
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
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Wallet</h2>
      <div className={styles.mnemonicDisplay}>
        <p>{mnemonic}</p>
      </div>
      <Button variant="primary"onClick={onProceed}>Proceed to Wallet</Button>
    </div>
  );
};

export default CreateWallet;