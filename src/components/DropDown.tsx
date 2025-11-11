import React, { useState, useRef, useEffect } from 'react';

export interface DropdownAction {
    label: string;
    onClick: () => void;
    color?: 'black' | 'red'; // default: 'black'
    showDivider?: boolean;
    condition?: boolean; // show this action only if condition is true
}

interface DropdownActionProps {
    isLastRow?: boolean;
    actions: DropdownAction[];
    children?: any;
}

const DropdownAction: React.FC<DropdownActionProps> = ({ isLastRow, actions, children }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClick);
        }
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    return (
        <div className="inline-block text-left" ref={ref}>
            {children ?
                <button onClick={() => setOpen((v) => !v)}>{children}</button> : <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Actions"
                >
                    &#8942;
                </button>}

            {open && (
                <div className={`absolute right-0 ${isLastRow ? 'bottom-0 mb-10' : 'mt-2'} w-40 bg-white border border-[#DFDFDF] rounded-lg shadow-lg z-10`}>
                    {actions.map((action, index) => {
                        // Skip rendering if condition is false
                        if (action.condition === false) return null;

                        const textColor = action.color === 'red' ? 'text-red-600' : 'text-black';
                        const dividerClass = action.showDivider ? 'border-t border-[#DFDFDF]' : '';

                        return (
                            <button
                                key={index}
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${textColor} ${dividerClass}`}
                                onClick={() => {
                                    setOpen(false);
                                    action.onClick();
                                }}
                            >
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropdownAction;
