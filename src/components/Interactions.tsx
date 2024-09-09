import React, { useState } from 'react';
import Button from './Button.tsx';
import View from './View.tsx';
import Balances from './Balances.tsx';
import TransactionHistory from './TransactionHistory.tsx';

const Interactions: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('default');

  const handleBuy = () => {
    setCurrentView('buy');
  };

  const handleSend = () => {
    setCurrentView('send');
  };

  const handleReceive = () => {
    setCurrentView('receive');
  };

  const handleBack = () => {
    setCurrentView('default');
  };

  return (
    <div className="interactions-container">
      
      <Balances />
      <h2>Interactions</h2>
      {currentView === 'default' ? (
        <>
          <Button label="Buy" onClick={handleBuy} />
          <Button label="Send" onClick={handleSend} />
          <Button label="Receive" onClick={handleReceive} />
        </>
      ) : (
        <View view={currentView} onBack={handleBack} tokenAddress={""} />
      )}
      <TransactionHistory /> {}
    </div>
  );
};

export default Interactions;