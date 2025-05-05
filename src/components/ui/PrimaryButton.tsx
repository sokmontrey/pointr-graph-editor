import React from "react";

interface PrimaryButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    children,
    className = "",
}) => {
    return (
        <button 
            onClick={onClick}
            className={`cursor-pointer shadow-md shadow-blue-200 hover:shadow-blue-300 flex-1 p-1.5 px-2.5 text-sm text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg transition-colors ${className}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;