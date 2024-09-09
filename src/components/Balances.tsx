import React, { useEffect, useState } from 'react';
import { getBalance } from '../hooks/WalletService.ts';
import { useTokens } from '../hooks/Tokens.ts';


const Balances: React.FC = () => {
  const [balances, setBalances] = useState<{ [address: string]: number }>({});

  useEffect(() => {
    const fetchBalances = async () => {
      let newBalances: { [address: string]: number } = {};
      const tokenAddresses = useTokens();
      for (const address of tokenAddresses) {
        const balance = await getBalance(address.address);

        newBalances[address.symbol] = balance;
      }
      setBalances(newBalances);
    };

    fetchBalances();
  }, []);

  return (
    <div className="balances-container">
      <h2>Balances</h2>
      <ul>
        {Object.entries(balances).map(([symbol, balance]) => (
          <li key={symbol}>
            {symbol}: {balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Balances;