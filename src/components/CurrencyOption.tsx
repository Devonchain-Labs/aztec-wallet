import React from 'react';

interface CurrencyOptionProps {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

const CurrencyOption: React.FC<CurrencyOptionProps> = ({ address, symbol, name, decimals }) => {
  return (
    <option value={symbol} data-address={address} data-name={name} data-decimals={decimals}>
      {symbol}
    </option>
  );
};

export default CurrencyOption;