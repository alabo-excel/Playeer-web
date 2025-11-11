import { X } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
  width?: string;
  children: ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  width = "500px",
  children,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(191, 191, 191, 0.8)' }}
    >
      <div
        className="bg-white rounded-3xl shadow-lg relative w-full my-8 max-h-[calc(100vh-4rem)]"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors duration-200 bg-white rounded-full p-1"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        )}

        <div className="overflow-y-auto max-h-[calc(100vh-4rem)] p-6 text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
