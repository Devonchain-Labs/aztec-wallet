import React, { useContext, useMemo } from "react";
import { ModalContext } from "../../../App.tsx";
import BuyModal from "../../modals/buy-modal/BuyModal.tsx";
import SendModal from "../../modals/send-modal/SendModal.tsx";
import ReceiveModal from "../../modals/receive-modal/ReceiveModal.tsx";

interface Props {
    children: React.ReactNode;
}

const ModalsProvider = ({ children }: Props) => {
    const { modal, props, closeModal } = useContext(ModalContext);

    const currentModal = useMemo(() => {
        switch (modal) {
            case "buy-modal":
                return <BuyModal onClose={closeModal} isOpen></BuyModal>;
            case "send-modal":
                return <SendModal onClose={closeModal} isOpen></SendModal>;
            case "receive-modal":
                return <ReceiveModal onClose={closeModal} isOpen></ReceiveModal>;
        }
    }, [modal, props]);

    return (
        <>
            {currentModal}
            {children}
        </>
    );
};

export default ModalsProvider;
