import React from "react";
import styles from "./transaction-history.module.css";
import Transaction from "../_common/transaction/Transaction.tsx";
const transactions = [
    {
        method: "transfer",
        amount: 250.75,
        timestamp: 1694200000000,
        status: "success",
        token: "ETH",
        paidFee: 0.005,
        txHash: "0xabc123def456ghi789jkl012mno345pqrs678tuv",
        contract: "0xcontractAddress1",
    },
    {
        method: "swap",
        amount: 1000.5,
        timestamp: 1694286400000,
        status: "pending",
        token: "USDT",
        paidFee: 0.002,
        txHash: "0xdef234ghi567jkl890mno123pqr456stu789vwx",
        contract: "0xcontractAddress2",
    },
    {
        method: "deposit",
        amount: 500.0,
        timestamp: 1694372800000,
        status: "failed",
        token: "BTC",
        paidFee: 0.001,
        txHash: "0xghi345jkl678mno901pqr234stu567vwx890yz",
        contract: "0xcontractAddress3",
    },
    {
        method: "withdraw",
        amount: 120.25,
        timestamp: 1694459200000,
        status: "success",
        token: "DAI",
        paidFee: 0.003,
        txHash: "0xjkl456mno789pqr012stu345vwx678yz901abc",
        contract: "0xcontractAddress4",
    },
    {
        method: "mint",
        amount: 350.0,
        timestamp: 1694545600000,
        status: "success",
        token: "UNI",
        paidFee: 0.008,
        txHash: "0xklm567nop890qrs123tuv456wxy789zab012cde",
        contract: "0xcontractAddress5",
    },
    {
        method: "burn",
        amount: 200.0,
        timestamp: 1694632000000,
        status: "pending",
        token: "LINK",
        paidFee: 0.004,
        txHash: "0xnop678qrs901tuv234wxy567zab890cde123fgh",
        contract: "0xcontractAddress6",
    },
    {
        method: "stake",
        amount: 450.0,
        timestamp: 1694718400000,
        status: "failed",
        token: "SUSHI",
        paidFee: 0.006,
        txHash: "0xpqr789stu012vwx345yz678abc901def234ghi",
        contract: "0xcontractAddress7",
    },
    {
        method: "unstake",
        amount: 800.0,
        timestamp: 1694804800000,
        status: "success",
        token: "AAVE",
        paidFee: 0.009,
        txHash: "0xstu890vwx123yz456abc789def012ghi345jkl",
        contract: "0xcontractAddress8",
    },
    {
        method: "buy",
        amount: 150.75,
        timestamp: 1694891200000,
        status: "success",
        token: "COMP",
        paidFee: 0.0025,
        txHash: "0xvwx901yz234abc567def890ghi123jkl456mno",
        contract: "0xcontractAddress9",
    },
    {
        method: "sell",
        amount: 90.5,
        timestamp: 1694977600000,
        status: "failed",
        token: "MATIC",
        paidFee: 0.0015,
        txHash: "0xyz012abc345def678ghi901jkl234mno567pqr",
        contract: "0xcontractAddress10",
    },
];
function TransactionHistory() {
    return (
        <div className={styles.container}>
            <h2>Transaction History</h2>
            <div className={styles.transactions}>
                {transactions?.map(item => (
                    <Transaction {...item} />
                ))}
            </div>
        </div>
    );
}

export default TransactionHistory;
