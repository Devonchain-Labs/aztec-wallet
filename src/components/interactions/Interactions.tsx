import React from "react";
import Balances from "../balances/Balances.tsx";
import TransactionHistory from "../transaction-history/TransactionHistory.tsx";
import styles from "./interactions.module.css";
const Interactions: React.FC = () => {
    return (
        <div className={styles.container}>
            <Balances />
            <TransactionHistory />
        </div>
    );
};

export default Interactions;
