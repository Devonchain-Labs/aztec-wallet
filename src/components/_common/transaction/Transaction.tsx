import React, { useContext } from "react";
import styles from "./transaction.module.css";
import ValueWithLabel from "../value-with-label/ValueWithLabel.tsx";
import { ModalContext } from "../../../App.tsx";
import { getStatusClassName } from "../../../helpers/helper.ts";
export interface TransactionProps {
    method: string;
    amount: number;
    timestamp: number;
    status: string;
    token: string;
    paidFee: number;
    txHash: string;
    contract: string;
}
function Transaction(transaction: TransactionProps) {
    const { openModal } = useContext(ModalContext);
    const date = new Date(transaction?.timestamp);
    const dateAsString = date?.toLocaleString();

    return (
        <div
            className={styles.container}
            onClick={() =>
                openModal?.("transaction-details-modal", {
                    transactionDetailsProps: { transaction: transaction },
                })
            }
        >
            <ValueWithLabel label="Method:" value={transaction?.method} />
            <ValueWithLabel label="Amount:" value={transaction?.amount} />
            <ValueWithLabel label="Date:" value={dateAsString} />
            <ValueWithLabel
                label="Status:"
                value={transaction?.status}
                valueClassName={styles[getStatusClassName(transaction?.status)]}
            />
        </div>
    );
}

export default Transaction;
