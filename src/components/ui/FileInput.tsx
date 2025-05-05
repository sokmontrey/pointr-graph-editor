import React, {useRef} from "react";
import PrimaryButton from "./PrimaryButton";

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
            <div className="flex w-full bg-white rounded-lg ">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                />
                <PrimaryButton onClick={handleButtonClick}>
                    Choose File
                </PrimaryButton>
            </div>
        </div>
    );
};

export default FileInput;