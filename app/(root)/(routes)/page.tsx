'use client'
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import useStoreModal from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";


export default function Home() {

    const isOpen = useStoreModal((state) => state.isOpen)
    const onOpen = useStoreModal((state) => state.onOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen]);



    return (
        <div>
            You have to create a Account first
        </div>
    )
}
