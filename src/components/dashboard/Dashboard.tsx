import React, { useContext, useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Navbar from "../navbar/Navbar.tsx";
import UserIcon from "../_common/icons/UserIcon.tsx";
import GlobeIcon from "../_common/icons/GlobeIcon.tsx";
import GearIcon from "../_common/icons/GearIcon.tsx";
import Typography from "../_common/typography/Typography.tsx";
import HiddenValue from "../_common/hidden-value/HiddenValue.tsx";
import CreditCardIcon from "../_common/icons/CreditCardIcon.tsx";
import ArrowUpIcon from "../_common/icons/ArrowUpIcon.tsx";
import ArrowDownIcon from "../_common/icons/ArrowDownIcon.tsx";
import { ModalContext } from "../../App.tsx";
import ShieldIcon from "../_common/icons/ShieldIcon.tsx";
import cx from "classnames";
import { getBalance } from "../../hooks/WalletService.ts";
import { getTokens } from "../../hooks/Tokens.ts";
import defaultTokens from "../../config/default_tokens.ts";
function Dashboard() {
    const [balances, setBalances] = useState<{ [address: string]: number }>({});
    const [selectedToekn, setSelectedToken] = useState(defaultTokens[0].symbol || "");
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
                <div className={styles.leftBalance}>
                    <div className={styles.balanceItem}>
                        <Typography size="sm" color="secondary">
                            Public balance:
                        </Typography>
                        <Typography>123.01$</Typography>
                    </div>
                    <div className={styles.balanceItem}>
                        <Typography size="sm" color="secondary">
                            Private balance:
                        </Typography>
                        <HiddenValue hiddenValue="" value={"200$"}></HiddenValue>
                    </div>
                </div>
                <div className={styles.balanceItem}>
                    <Typography size="sm" color="secondary">
                        Private balance:
                    </Typography>
                    <HiddenValue hiddenValue="" value={"323.01$"}></HiddenValue>
                </div>
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
                <div
                    className={styles.iconWrapper}
                    onClick={() => {
                        openModal?.("receive-modal");
                    }}
                >
                    <ShieldIcon />
                </div>
            </div>
            <Typography variant="h3" size="lg" className={styles.tokensTitle}>
                Tokens
            </Typography>
            <ul className={styles.tokens}>
                {Object.entries(balances).map(([symbol]) => (
                    <li key={symbol} onClick={() => setSelectedToken(symbol)}>
                        <Typography
                            color={symbol === selectedToekn ? "aztec-button-color" : "secondary"}
                        >
                            {symbol}
                        </Typography>
                        <Typography
                            color={symbol === selectedToekn ? "aztec-button-color" : "secondary"}
                        >
                            $$$$
                        </Typography>
                    </li>
                ))}
            </ul>
            <Navbar />
        </div>
    );
}

export default Dashboard;
