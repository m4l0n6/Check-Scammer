import { useState } from "react";

export const useHandleModal = () => {
    const [modalDetail, setModalDetail] = useState(false);
    const [selectedScammer, setSelectedScammer] = useState(null);
    const handleShowModalDetail = (scammer = null) => {
        setSelectedScammer(scammer);
        setModalDetail(!modalDetail);
        document.body.style.overflow = modalDetail ? "auto" : "hidden";
    };
    return { modalDetail, handleShowModalDetail, selectedScammer};
}

