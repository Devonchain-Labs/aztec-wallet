import React from "react";
import Modal, { BaseModalProps } from "../../_common/modal/Modal.tsx";
import styles from "./transaction-details-modal.module.css";
import ModalHeader from "../../_common/modal-header/ModalHeader.tsx";
import { TransactionProps } from "../../_common/transaction/Transaction.tsx";
import ValueWithLabel from "../../_common/value-with-label/ValueWithLabel.tsx";
import { TModalProps } from "../../_common/modal/types.ts";
import { getStatusClassName } from "../../../helpers/helper.ts";

const TransactionDetailsModal: React.FC<
    BaseModalProps & Partial<TModalProps["transactionDetailsProps"]>
> = ({ onClose, isOpen, transaction }) => {
    const date = new Date(transaction?.timestamp || "");
    const dateAsString = date?.toLocaleString();
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className={styles.container}>
                <ModalHeader onClose={onClose} title="Receive"></ModalHeader>
                <div className={styles.transactionDetails}>
                    <div className={styles.topSection}>
                        <ValueWithLabel label="Method:" value={transaction?.method} />
                        <ValueWithLabel label="Date:" value={dateAsString} />
                        <ValueWithLabel label="Token:" value={transaction?.token} />
                        <ValueWithLabel label="Amount:" value={transaction?.amount} />
                    </div>
                    <div className={styles.bottomSection}>
                        <p>Paid fee:</p> <p>{transaction?.paidFee}</p>
                        <p>Status:</p>{" "}
                        <p className={styles[getStatusClassName(transaction?.status || "")]}>
                            {transaction?.status}
                        </p>
                        <p>Tx hash:</p> <p>{transaction?.paidFee}</p>
                        <p>contr:</p> <p>{transaction?.paidFee}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default TransactionDetailsModal;
