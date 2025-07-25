import { X } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
  width?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  width = "500px",
  children,
  onClose,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-60 flex items-center justify-center bg-[#232323] opacity-40"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-3xl shadow-lg p-6 z-70 fixed top-20 left-1/2 transform -translate-x-1/2 max-h-[80vh] hide-scrollbar overflow-y-auto w-[95%] md:w-full"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
