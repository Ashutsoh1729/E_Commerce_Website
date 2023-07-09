'use client'
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

interface ModalProps {
    title?: string,
    description?: string,
    isOpen:boolean,
    onClose: () => void,
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, description, isOpen = false, onClose, children }) => {

    const handleChange = (isOpen: boolean)=>{
        if (!isOpen) {
            onClose();
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleChange} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                    {children}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Modal;


