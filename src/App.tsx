import React, { useState } from 'react';

import CreateWallet from './components/create-wallet/CreateWallet.tsx';
import Interactions from './components/Interactions.tsx';
import View from './components/View.tsx';
import RecoverWallet from './components/RecoverWallet.tsx';
import { WalletProvider } from './components/WalletContext.tsx';
import WalletOptions from './components/wallet-options/WalletOptions.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('wallet-options');

  const handleCreateNewWallet = () => {
    setCurrentView('create-wallet');
  };

  const handleRecoverWallet = () => {
    setCurrentView('recover-wallet');
  };

  const handleProceedToWallet = () => {
    setCurrentView('wallet-interactions');
  };

  const handleBack = () => {
    setCurrentView('wallet-options');
  };

  return (
    <WalletProvider>
      <div className="app-container">
        {currentView === 'wallet-options' && (
          <WalletOptions
            onCreateNewWallet={handleCreateNewWallet}
            onRecoverWallet={handleRecoverWallet}
          />
        )}
        {currentView === 'create-wallet' && (
          <CreateWallet onProceed={handleProceedToWallet} />
        )}
        {currentView === 'wallet-interactions' && (
          <Interactions/>
        )}
        {currentView === 'recover-wallet' && (
          <RecoverWallet onProceed={handleProceedToWallet} />
        )}
      </div>
    </WalletProvider>
  );
};

export default App;