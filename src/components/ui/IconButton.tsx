import {HugeiconsIcon, IconSvgElement} from "@hugeicons/react";
import React from "react";

export interface IconButtonProps {
    icon: IconSvgElement;
    onClick: () => void;
    ref?: React.Ref<HTMLButtonElement>;
    className?: string;
    active?: boolean;
}

const IconButton = ({
                        icon,
                        onClick,
                        ref,
                        className = "",
                        active = false,
                    }: IconButtonProps) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            className={`
                w-[40px] h-[40px]
                flex items-center justify-center
                border-none rounded-xl
                p-[4px] cursor-pointer
                transition-all duration-100 ease-in-out
                shadow-xl
                ${active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}
                hover:bg-blue-500 hover:text-white
                ${className}
            `}
        >
            <HugeiconsIcon
                icon={icon}
                strokeWidth={2}
                size={18}
                className={`
                    transition-all duration-200
                    ${active ? 'text-white drop-shadow-lg' : 'text-primary drop-shadow-sm'}
                    hover:text-white hover:drop-shadow-lg
                `}
            />
        </button>
    );
}

export default IconButton;
