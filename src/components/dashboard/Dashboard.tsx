import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Navbar from "../navbar/Navbar.tsx";
import UserIcon from "../_common/icons/UserIcon.tsx";
import GlobeIcon from "../_common/icons/GlobeIcon.tsx";
import GearIcon from "../_common/icons/GearIcon.tsx";
import Typography from "../_common/typography/Typography.tsx";
import CreditCardIcon from "../_common/icons/CreditCardIcon.tsx";
import ArrowUpIcon from "../_common/icons/ArrowUpIcon.tsx";
import ArrowDownIcon from "../_common/icons/ArrowDownIcon.tsx";
import { ModalContext } from "../../App.tsx";
import cx from "classnames";
import { getBalance } from "../../hooks/WalletService.ts";
import { getTokens } from "../../hooks/Tokens.ts";
import defaultTokens from "../../config/default_tokens.ts";
const mockBalances = [351, 456, 678];
function Dashboard() {
    const [balances, setBalances] = useState<{ [address: string]: number }>({});
    const { openModal } = useContext(ModalContext);
    useEffect(() => {
        const fetchBalances = async () => {
            let newBalances: { [address: string]: number } = {};
            const tokenAddresses = getTokens();
            console.log(tokenAddresses);
            for (const address of tokenAddresses) {
                try {
                    const balance = await getBalance(address.address);

                    newBalances[address.symbol] = balance;
                } catch {
                    newBalances[address.symbol] = 0;
                }
            }
            setBalances(newBalances);
        };

        fetchBalances();
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.topZoneContainer}>
                <div className={styles.iconWrapper}>
                    <UserIcon />{" "}
                </div>
                <div className={styles.topRight}>
                    <div className={styles.iconWrapper}>
                        <GlobeIcon />{" "}
                    </div>
                    <div className={styles.iconWrapper}>
                        <GearIcon />{" "}
                    </div>
                </div>
            </div>
            <div className={styles.balanceContainer}>
                <Typography size="lg">Account #1</Typography>
                <Typography size="md" color="secondary">
                    1485$
                </Typography>
            </div>
            <div className={styles.actions}>
                <div
                    className={styles.iconWrapper}
                    onClick={() => {
                        openModal?.("buy-modal");
                    }}
                >
                    <CreditCardIcon />
                </div>
                <div
                    className={styles.iconWrapper}
                    onClick={() => {
                        openModal?.("send-modal");
                    }}
                >
                    <ArrowUpIcon />
                </div>
                <div
                    className={styles.iconWrapper}
                    onClick={() => {
                        openModal?.("receive-modal");
                    }}
                >
                    <ArrowDownIcon />
                </div>
            </div>
            <Typography variant="h3" size="lg" className={styles.tokensTitle}>
                Tokens
            </Typography>
            <ul className={styles.tokens}>
                {Object.entries(balances).map(([symbol], index) => (
                    <li key={symbol}>
                        <Typography color={"secondary"}>{symbol}</Typography>
                        <Typography color={"secondary"}>{mockBalances[index]}$</Typography>
                    </li>
                ))}
                <li>
                    <Typography color={"secondary"}>Add Token</Typography>
                    <Typography color={"secondary"}>+</Typography>
                </li>
            </ul>
            <Navbar />
        </div>
    );
}

export default Dashboard;
