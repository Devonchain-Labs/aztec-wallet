import React from "react";
import styles from "./navbar.module.css";
import WalletIcon from "../_common/icons/WalletIcon.tsx";
import Typography from "../_common/typography/Typography.tsx";
import ArrowsLeftRightIcon from "../_common/icons/ArrowsLeftRightIcon.tsx";
import ClipboardQuestionIcon from "../_common/icons/ClipboardQuestionIcon.tsx";
import ShieldIcon from "../_common/icons/ShieldIcon.tsx";

function Navbar() {
    return (
        <nav className={styles.container}>
            <div className={styles.itemContainer}>
                <div className={styles.iconWrapper}>
                    <WalletIcon className={styles.icon} />{" "}
                </div>
                <Typography size="sm">Wallet</Typography>
            </div>
            <div className={styles.itemContainer}>
                <div className={styles.iconWrapper}>
                    {" "}
                    <ShieldIcon className={styles.icon} />
                </div>
                <Typography size="sm">Shield</Typography>
            </div>
            <div className={styles.itemContainer}>
                <div className={styles.iconWrapper}>
                    <ArrowsLeftRightIcon className={styles.icon} />
                </div>
                <Typography size="sm">TxHistory</Typography>
            </div>
            <div className={styles.itemContainer}>
                {" "}
                <div className={styles.iconWrapper}>
                    <ClipboardQuestionIcon className={styles.icon} />
                </div>
                <Typography size="sm">Discover</Typography>
            </div>
        </nav>
    );
}

export default Navbar;
