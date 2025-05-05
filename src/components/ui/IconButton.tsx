import {HugeiconsIcon, IconSvgElement} from "@hugeicons/react";
import React from "react";

export interface IconButtonProps {
    icon: IconSvgElement;
    onClick: () => void;
    ref?: React.Ref<HTMLButtonElement>;
    className?: string;
    active?: boolean;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const IconButton = ({
                        icon,
                        onClick,
                        ref,
                        className = "",
                        active = false,
                        size = 'md',
                        disabled = false,
                    }: IconButtonProps) => {
    const sizeMap = {
        sm: 'w-[30px] h-[30px]',
        md: 'w-[40px] h-[40px]',
        lg: 'w-[50px] h-[50px]',
    };

    return (
        <button
            ref={ref}
            onClick={onClick}
            className={` ${sizeMap[size]} flex items-center justify-center border-none rounded-xl p-[4px] cursor-pointer transition-all duration-50 ease-in-out shadow-sm 
                ${active ? 'text-white bg-blue-500' : 'text-gray-700 bg-white'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}
                ${className}
            `}
        >
            <HugeiconsIcon
                icon={icon}
                strokeWidth={2}
                size={18}
                className={` transition-all duration-100
                    ${active ? 'text-white drop-shadow-sm' : 'drop-shadow-sm'}
                `}
            />
        </button>
    );
}

export default IconButton;
