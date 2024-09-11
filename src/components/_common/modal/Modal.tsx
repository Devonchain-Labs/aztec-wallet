import React from "react";
import styles from "./modal.module.css";
import cx from "classnames";
import { createPortal } from "react-dom";

export interface  BaseModalProps {

    onClose: () => void;
    isOpen: boolean;
   
}
interface Props extends BaseModalProps{
       children: React.ReactNode; 
}
const Modal: React.FC<Partial<Props>> = ({
    children,
    isOpen,  
}) => {
   
    return createPortal(
        <div
            className={cx(
                styles.outerContainer,
                {
                    [styles.show]: isOpen,
                    [styles.hide]: !isOpen,
                },
              
            )}           
        >
            <div className={styles.container} >
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
