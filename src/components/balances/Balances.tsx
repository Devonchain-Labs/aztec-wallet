import React, { useContext, useEffect, useState } from "react";
import { getBalance } from "../../hooks/WalletService.ts";
import { getTokens } from "../../hooks/Tokens.ts";
import styles from "./balances.module.css";
import cx from "classnames";
import defaultTokens from "../../config/default_tokens.ts";
import HiddenValue from "../_common/hidden-value/HiddenValue.tsx";
import CreditCardIcon from "../_common/icons/CreditCardIcon.tsx";
import { ModalContext } from "../../App.tsx";
import ArrowUpIcon from "../_common/icons/ArrowUpIcon.tsx";
import ArrowDownIcon from "../_common/icons/ArrowDownIcon.tsx";
const Balances: React.FC = () => {
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
    console.log("yy", balances);
    return (
        <div className={styles.container}>
            <div className={styles.selectedBalanceContainer}>
                <div className={styles.balanceItem}>
                    <p>Public balance:</p> <p>0</p>
                </div>
                <div className={styles.balanceItem}>
                    <p>Private balance:</p> <HiddenValue hiddenValue="***" value="0" />
                </div>
                <div className={styles.balanceItem}>
                    <p>Total balance:</p> <HiddenValue hiddenValue="***" value="0" />
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
            </div>
            <ul className={styles.tokens}>
                {Object.entries(balances).map(([symbol]) => (
                    <li
                        key={symbol}
                        onClick={() => setSelectedToken(symbol)}
                        className={cx(symbol === selectedToekn ? styles.selected : "")}
                    >
                        {symbol}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Balances;
