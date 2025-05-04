import React from "react";

interface WorkspaceSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    className?: string;
}

const SelectInput: React.FC<WorkspaceSelectProps> = ({
    value,
    onChange,
    options,
    className = "",
}) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`p-1.5 text-sm bg-white rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-200 focus:shadow-md hover:bg-blue-500 hover:text-white outline-none transition-colors duration-200 px-3 font-mono text-gray-500 ${className}`}
        >
            {options.map(option => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;