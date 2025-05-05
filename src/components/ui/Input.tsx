import React from "react";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    label?: string;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = "",
    className = "",
    label,
}) => {
    return (
        <div className="flex flex-row items-center w-full bg-white rounded-lg shadow-sm overflow-hidden group transition-colors duration-200">
            {label && <div className="flex-none text-left font-mono text-xs text-gray-500 p-2 pl-4 pr-3 border-r-2 border-gray-200 group-hover:text-blue-500 group-hover:font-bold group-hover:border-blue-500 transition-all duration-200">
                {label}
            </div>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-20 flex-1 p-1 px-3 outline-none border-none bg-transparent text-gray-700 text-left font-mono ${className}`}
            />
        </div>
    );
};

export default Input;