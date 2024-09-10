import { TxHash } from '@aztec/aztec.js';
import pxe from './PXEService.ts';

const transactionQueue: { txHash: TxHash }[] = JSON.parse(localStorage.getItem('transactionQueue') || '[]');

const saveTransactionQueue = () => {
    localStorage.setItem('transactionQueue', JSON.stringify(transactionQueue));
};

const checkTransactionStatus = async () => {
    for (let i = 0; i < transactionQueue.length; i++) {
        const { txHash } = transactionQueue[i];
        const receipt = await pxe.getTxReceipt(txHash);
        if (receipt.status === 'success') {
            console.log(`Transaction ${txHash} succeeded`);
            transactionQueue.splice(i, 1);
            saveTransactionQueue();
            i--;
        } else {
            console.log(`Transaction ${txHash} is still pending`);
        }
    }
};

setInterval(checkTransactionStatus, 10000);

export const addPendingTransaction = (txHash: TxHash) => {
    transactionQueue.push({ txHash });
    saveTransactionQueue();
};

export const getPendingTransactions = (): TxHash[] => {
    return transactionQueue.map(({ txHash }) => txHash);
}

export const getTransactions = () => {
    const transactions = localStorage.getItem('transactions');
    if (!transactions) {
        return ;
    }
    return JSON.parse(transactions);
}