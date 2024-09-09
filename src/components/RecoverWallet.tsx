import React, { useState } from 'react';
import  { getAccountWalletSchnorr, recoverFromMnemonic, setWallet } from '../hooks/WalletService.ts';

interface RecoverWalletProps {
  onProceed: () => void;
}

const RecoverWallet: React.FC<RecoverWalletProps> = ({ onProceed }) => {
  const [mnemonic, setMnemonic] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMnemonic(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const keyPair = recoverFromMnemonic(mnemonic);
    console.log('Recovered key pair:', keyPair);
    // TODO: Save the key pair in a local DB
    const accountWallet = await getAccountWalletSchnorr(keyPair.publicKey, keyPair.privateKey);
    setWallet(keyPair.publicKey, keyPair.privateKey);
    console.log('Recovered account wallet:', accountWallet);
    onProceed();
  };

  return (
    <div className="recover-wallet-container">
      <h2>Recover Wallet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mnemonic">Mnemonic:</label>
          <input
            type="text"
            id="mnemonic"
            value={mnemonic}
            onChange={handleInputChange}
            required
            className="input-spacing"
          />
        </div>
        <button className="btn btn-primary" type="submit">Recover</button>
      </form>
    </div>
  );
};

export default RecoverWallet;