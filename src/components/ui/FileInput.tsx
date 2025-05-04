import React, { useRef } from "react";

interface FileInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    label?: string;
}

const FileInput: React.FC<FileInputProps> = ({
    onChange,
    accept = "image/*",
    label,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="flex w-full bg-white rounded-lg shadow-sm overflow-hidden">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                />
                <button 
                    onClick={handleButtonClick}
                    className="flex-1 p-1.5 px-2.5 text-sm text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg transition-colors"
                >
                    Choose File
                </button>
            </div>
        </div>
    );
};

export default FileInput;