import React, { useEffect, useState } from 'react';
import { getPendingTransactions, getTransactions } from '../hooks/TransactionService.ts'
import { TxHash } from '@aztec/aztec.js';

function TransactionHistory() {
  const [pendingTransactions, setPendingTransactions] = useState<TxHash[]>([]);
  const [transactions, setTransactions] = useState<TxHash[]>([]);

  useEffect(() => {
    // Fetch transaction history
    const pendingTransactions = getPendingTransactions();
    setPendingTransactions(pendingTransactions);

    const transactions = getTransactions();
    setTransactions(transactions);
  }, []);

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      <div>
        <h2>Pending Transactions</h2>
            <ul>
                {pendingTransactions?.map((transaction, index) => (
                    <li key={index}>{transaction.toString()}</li>
                ))}
            </ul>

        <h2>Past Transactions</h2>
          <ul>
              {transactions?.map((transaction, index) => (
                  <li key={index}>{transaction.toString()}</li>
              ))}
          </ul>
      </div>
    </div>
  );
}

export default TransactionHistory;