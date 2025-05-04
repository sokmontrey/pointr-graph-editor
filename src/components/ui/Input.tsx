import React from "react";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = "",
    className = "",
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`p-1.5 text-sm bg-white rounded-lg shadow-sm hover:shadow-md focus:shadow-md outline-none transition-colors duration-200 px-3 font-mono text-gray-500 ${className}`}
        />
    );
};

export default Input;