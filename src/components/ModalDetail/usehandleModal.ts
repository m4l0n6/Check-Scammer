import { useState } from "react";

export const useHandleModal = () => {
    const [modalDetail, setModalDetail] = useState(false);
    const [selectedScammer, setSelectedScammer] = useState<{
    scammer__name: string;
    scammer_phone: string;
    bank__number: string;
    bank__name: string;
    content: string;
    user__name: string;
    user__phone: string;
    user__type: string;
    images: string[];
    date: string;
  } | null>(null);
    const handleShowModalDetail = (scammer?: {
    scammer__name: string;
    scammer_phone: string;
    bank__number: string;
    bank__name: string;
    content: string;
    user__name: string;
    user__phone: string;
    user__type: string;
    images: string[];
    date: string;
  } | null) => {
        setSelectedScammer(scammer || null);
        setModalDetail(!modalDetail);
        document.body.style.overflow = modalDetail ? "auto" : "hidden";
    };
    return { modalDetail, handleShowModalDetail, selectedScammer};
}

