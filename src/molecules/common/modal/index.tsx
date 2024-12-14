import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            className="relative bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-2xl font-bold hover:text-gray-400"
                >
                    &times;
                </button>
            </div>
            <div>{children}</div>
        </ReactModal>
    );
};

export default Modal;
