import React, { useEffect, useState } from 'react';
import PaymentProvider from './PaymentProvider.tsx';
// import CurrencyOption from './CurrencyOption.tsx';
import FeeAmount from './FeeAmount.tsx';
import { createPublicTransaction } from '../hooks/WalletService.js';
import { AccountWallet, AztecAddress } from '@aztec/aztec.js';
import { TokenContractArtifact } from "@aztec/noir-contracts.js/Token";
import { WalletProvider } from './WalletContext.tsx';
import { ContractArtifact } from '@aztec/foundation/abi';
import { getTokens } from '../hooks/Tokens.ts';
import { getWallet } from '../hooks/WalletService.ts';

interface ViewProps {
  view: string;
  onBack: () => void;
  tokenAddress: string;
}

interface CurrencyOptionProps {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

const View: React.FC<ViewProps> = ({ view, onBack }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [currentView, setCurrentView] = useState(view);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOptionProps | null>(null);
  const [wallet, setWallet] = useState<AccountWallet>();

  useEffect(() => {
    const fetchWallet = async () => {
      const wallet = await getWallet();
      setWallet(wallet);
    };

    fetchWallet();
  });

  const handleSelectProvider = (provider: string) => {
    console.log(`Selected provider: ${provider}`);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    const currencyOptions: CurrencyOptionProps[] = getTokens();

    const selectedCurrency = currencyOptions.find(option => option.symbol === selectedOption);
    if (selectedCurrency) {
      setSelectedCurrency(selectedCurrency);
      setCurrency(selectedOption);
      setTokenAddress(selectedCurrency.address);
    }
  };

  const handleReceiverAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  };

  const handleTransactionSummary = () => {
    setCurrentView('transaction-summary');
  };

  const handleSimulateTxClick = async () => {
    await onSimulateTx(tokenAddress, 'transfer_public', [wallet?.getAddress(), AztecAddress.fromString(receiverAddress), String(amount), String(0)]);
  }

  const onSimulateTx = async (contractAddress: string, methodName: string, args: any[]) => {
    if (wallet) {
      await createPublicTransaction(
        contractAddress, 
        methodName, 
        TokenContractArtifact as unknown as ContractArtifact,
        args
      );
    } else {
      console.error('Account wallet not found');
    }
  }

  switch (currentView) {
    case 'buy':
      return (
        <div className="buy-view">
          <h3>Buy</h3>
          <div className="item-list">
            <PaymentProvider
              name="MoonPay"
              description=""
              onSelect={() => handleSelectProvider('Provider 1')}
            />
            <PaymentProvider
              name="Debit Card"
              description=""
              onSelect={() => handleSelectProvider('Provider 2')}
            />
            <PaymentProvider
              name="SEPA Bank Transfer"
              description=""
              onSelect={() => handleSelectProvider('Provider 3')}
            />
          </div>
          <button className="btn btn-secondary" onClick={onBack}>Back</button>
        </div>
      );
    case 'send':
      return (
        <div className="send-view">
          <h3>Send</h3>
          <div className="send-input-group">
            <select value={currency} onChange={handleCurrencyChange} className="currency-select">
              <option value="">Select Currency</option>
              <option value="ETH">Ethereum</option>
              <option value="WBTC">Wrapped Bitcoin</option>
              <option value="USDC">USD Coin</option>
            </select>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Amount"
              className="amount-input"
            />
            <input
              type="text"
              value={receiverAddress}
              onChange={handleReceiverAddressChange}
              placeholder="Receiver Address"
              className="receiver-address-input"
            />
          </div>
          <FeeAmount /> {/* Add the FeeAmount component */}
          <button className="btn btn-secondary" onClick={onBack}>Back</button>
          <button className="btn btn-primary" onClick={handleTransactionSummary}>Transaction Summary</button>
        </div>
      );
      case 'transaction-summary':
        return (
          <WalletProvider>
            <div className="transaction-summary-view">
              <h3>Transaction Summary</h3>
              <div className="transaction-details">
                <p><strong>Amount:</strong> {amount} {currency}</p>
                <p><strong>Selected currency:</strong> {selectedCurrency?.symbol}</p>
                <p><strong>Receiver Address:</strong> {receiverAddress}</p>
                <FeeAmount /> {/* Display the FeeAmount component */}
              </div>
              <button className="btn btn-secondary" onClick={onBack}>Back</button>
              <button className="btn btn-primary" onClick={handleSimulateTxClick}>Send Transaction</button>
            </div>
          </WalletProvider>
        );
    case 'receive':
      const mockQRCodeUrl = 'https://via.placeholder.com/150';

      return (
        <div className="receive-view">
          <h3>Receive</h3>
          <div className="public-key">
            <strong>Public Key:</strong> {wallet ? wallet.getAddress().toString(): 'Loading...'}
          </div>
          <div className="qr-code">
            <img src={mockQRCodeUrl} alt="QR Code" />
          </div>
          <button className="btn btn-secondary" onClick={onBack}>Back</button>
        </div>
      );
    default:
      return <div>Default View</div>;
  }
};

export default View;