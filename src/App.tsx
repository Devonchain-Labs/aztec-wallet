/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CreateWallet from "./components/create-wallet/CreateWallet.tsx";
import Interactions from "./components/Interactions.tsx";
import RecoverWallet from "./components/recover-wallet/RecoverWallet.tsx";
import { WalletProvider } from "./components/WalletContext.tsx";
import WalletOptions from "./components/wallet-options/WalletOptions.tsx";
import { TModals } from "./components/_common/modal/types.ts";
import ModalsProvider from "./components/_common/modals-provider/ModalsProvider.tsx";
import { ToastContainer } from "react-toastify";
interface ModalContextProps {
    modal: TModals;
    props?: any;
    openModal?: (modal: TModals, props?: any) => void;
    closeModal: () => void;
}
export const ModalContext = createContext<ModalContextProps>({
    modal: undefined,
    closeModal: () => {},
});
const App: React.FC = () => {
    const [modal, setModal] = useState<TModals>(undefined);
    const [props, setProps] = useState<any>(undefined);
    const [currentView, setCurrentView] = useState("wallet-options");
    const openModal = (modal: TModals, props: any = undefined) => {
        setModal(modal);
        setProps(props);
    };
    const closeModal = () => {
        setModal(undefined);
        setProps(undefined);
    };
    const handleCreateNewWallet = () => {
        setCurrentView("create-wallet");
    };

    const handleRecoverWallet = () => {
        setCurrentView("recover-wallet");
    };

    const handleProceedToWallet = () => {
        setCurrentView("wallet-interactions");
    };

    const handleBack = () => {
        setCurrentView("wallet-options");
    };

    return (
        <ModalContext.Provider value={{ modal, props, openModal, closeModal }}>
            <WalletProvider>
                <ModalsProvider>
                    <div className="app-container">
                        {currentView === "wallet-options" && (
                            <WalletOptions
                                onCreateNewWallet={handleCreateNewWallet}
                                onRecoverWallet={handleRecoverWallet}
                            />
                        )}
                        {currentView === "create-wallet" && (
                            <CreateWallet onProceed={handleProceedToWallet} />
                        )}
                        {currentView === "wallet-interactions" && <Interactions />}
                        {currentView === "recover-wallet" && (
                            <RecoverWallet onProceed={handleProceedToWallet} />
                        )}
                    </div>
                    <ToastContainer containerId={"generalContainer"} />
                </ModalsProvider>
            </WalletProvider>
        </ModalContext.Provider>
    );
};

export default App;
