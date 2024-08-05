'use client'
import {useEffect, useState} from 'react'
import {StoreModal} from "@/components/modals/store-modal";

export const ModalProvider =()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isMounted, setIsMounted] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setIsMounted(true)
    }, []);
    if(!isMounted){
        return null
    }
    return (
        <>
            <StoreModal/>
        </>
    );
}
