import React from "react";
import Modal, { BaseModalProps } from "../../_common/modal/Modal.tsx";
import styles from "./receive-modal.module.css";
import ModalHeader from "../../_common/modal-header/ModalHeader.tsx";
import CloneIcon from "../../_common/icons/CloneIcon.tsx";
import OpenLinkIcon from "../../_common/icons/OpenLinkIcon.tsx";
import { toast } from "react-toastify";
const ReceiveModal: React.FC<BaseModalProps> = ({ onClose, isOpen }) => {
    const address = "0x18701FD1acd081c0Fd6C56459Faf2DAd78A5Fe27";
    const link = "https://etherscan.io/address/0x18701FD1acd081c0Fd6C56459Faf2DAd78A5Fe27";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address);
        toast.success("Copied!", { position: "top-right", containerId: "modalContainer" });
    };
    const openLink = () => {
        window.open(link, "_blank");
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className={styles.container}>
                <ModalHeader onClose={onClose} title="Receive"></ModalHeader>
                <div className={styles.list}>
                    <h4>Address:</h4>
                    <div className={styles.addressContainer}>
                        <p className={styles.adress}>{address}</p>
                        <CloneIcon onClick={copyToClipboard} className={styles.icon} />
                        <OpenLinkIcon onClick={openLink} className={styles.icon} />
                    </div>
                </div>
                <img
                    className={styles.qrCode}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURI(
                        "https://etherscan.io/address/0x18701FD1acd081c0Fd6C56459Faf2DAd78A5Fe27",
                    )}`}
                    alt="qrcode"
                    title="qrcode"
                ></img>
            </div>
        </Modal>
    );
};
export default ReceiveModal;
