import {HugeiconsIcon, IconSvgElement} from "@hugeicons/react";
import React from "react";

export interface IconButtonProps {
    icon: IconSvgElement;
    onClick: () => void;
    ref?: React.Ref<HTMLButtonElement>;
    className?: string;
}

const IconButton = ({
                        icon,
                        onClick,
                        ref,
                        className,
                    }: IconButtonProps) => {
    return <>
        <button
            ref={ref}
            onClick={onClick}
            className={`${className || ""} square-button`}
        >
            <HugeiconsIcon icon={icon} strokeWidth={2} />
        </button>
    </>;
}

export default IconButton;
