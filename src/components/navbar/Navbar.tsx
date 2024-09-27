import React from "react";
import styles from "./navbar.module.css";
import WalletIcon from "../_common/icons/WalletIcon.tsx";
import Typography from "../_common/typography/Typography.tsx";
import BoltIcon from "../_common/icons/BoltIcon.tsx";
import ArrowsLeftRightIcon from "../_common/icons/ArrowsLeftRightIcon.tsx";
import ClipboardQuestionIcon from "../_common/icons/ClipboardQuestionIcon.tsx";

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
                    <BoltIcon className={styles.icon} />
                </div>
                <Typography size="sm">Nfts</Typography>
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
