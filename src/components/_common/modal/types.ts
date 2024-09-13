import { TransactionProps } from "../transaction/Transaction.tsx";

export type TModals =
    | "buy-modal"
    | "send-modal"
    | "receive-modal"
    | "transaction-details-modal"
    | undefined;
export type TModalProps = { transactionDetailsProps: { transaction: TransactionProps } };
