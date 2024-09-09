import React from 'react';

interface PaymentProviderProps {
  name: string;
  description: string;
  onSelect: () => void;
}

const PaymentProvider: React.FC<PaymentProviderProps> = ({ name, description, onSelect }) => {
  return (
    <div className="payment-provider" onClick={onSelect}>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default PaymentProvider;