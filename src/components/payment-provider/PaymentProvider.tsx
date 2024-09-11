import React from 'react';
import styles from "./payment-provider.module.css"
interface PaymentProviderProps {
  name: string;
  description: string;
  onSelect: () => void;
}

const PaymentProvider: React.FC<PaymentProviderProps> = ({ name, description, onSelect }) => {
  return (
    <div className={styles.container} onClick={onSelect}>
      <h4 className={styles.title}>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default PaymentProvider;