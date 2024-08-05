"use client"

import {useStoreModal} from "@/hooks/use-store-modal";
import {useEffect} from "react";

const setUpPage = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onOpen = useStoreModal((state) =>state.onOpen)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isOpen = useStoreModal((state) =>state.isOpen)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!isOpen)
        {
          onOpen();
        }
    }, [isOpen,onOpen]);
    return null;
}

export default setUpPage