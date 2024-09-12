import React from "react";
import Balances from "./balances/Balances.tsx";
import TransactionHistory from "./TransactionHistory.tsx";

const Interactions: React.FC = () => {
    return (
        <div className="interactions-container">
            <Balances />
            <TransactionHistory />
        </div>
    );
};

export default Interactions;
