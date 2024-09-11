import React from "react";
import styles from "./modal-header.module.css";
import CloseIcon from "../icons/CloseIcon.tsx";
interface Props {
    title: string;
    onClose?: () => void;
}
const ModalHeader = ({ title, onClose }: Props) => {
    return (
        <header className={styles.headerZone}>
            <h3 className={styles.title}>
                {title}
            </h3>
            <span className={styles.iconWrapper}  onClick={onClose}><CloseIcon className={styles.closeIcon}/></span>
        </header>
    );
};
export default ModalHeader;