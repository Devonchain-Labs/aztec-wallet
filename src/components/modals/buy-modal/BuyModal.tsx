import React from "react";
import Modal, { BaseModalProps } from "../../_common/modal/Modal.tsx";
import styles from "./buy-modal.module.css"
import ModalHeader from "../../_common/modal-header/ModalHeader.tsx";
import PaymentProvider from "../../payment-provider/PaymentProvider.tsx";



const BuyModal: React.FC<BaseModalProps> = ({ onClose, isOpen }) => {
  
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className={styles.container}>
              <ModalHeader onClose={onClose} title="Buy">
              </ModalHeader>
              <div className={styles.list}>
                <PaymentProvider
                name="MoonPay"
                description=""
                onSelect={() => console.log('Provider 1')}
                />
                <PaymentProvider
                name="Debit Card"
                description=""
                onSelect={() => console.log('Provider 2')}
                />
                <PaymentProvider
                name="SEPA Bank Transfer"
                description=""
                onSelect={() => console.log('Provider 3')}
                />
          </div>
            </div>
        </Modal>
    );
};
export default BuyModal;
