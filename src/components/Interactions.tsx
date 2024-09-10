import React, { useState } from 'react';

import View from './View.tsx';
import Balances from './Balances.tsx';
import TransactionHistory from './TransactionHistory.tsx';
import Button from './_common/button/Button.tsx';

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
          <Button  onClick={handleBuy} >Buy</Button>
          <Button  onClick={handleSend} >Send</Button>
          <Button onClick={handleReceive} >Receive</Button>
        </>
      ) : (
        <View view={currentView} onBack={handleBack} tokenAddress={""} />
      )}
      <TransactionHistory /> {}
    </div>
  );
};

export default Interactions;