import React, {useState, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {IconSvgElement} from "@hugeicons/react";
import {SearchIcon} from "@hugeicons/core-free-icons";
import IconButton from "../ui/IconButton.tsx";

export type PopupDirection = 'top' | 'right' | 'bottom' | 'left';

export interface PopupToggleProps {
    children: React.ReactNode;
    direction?: PopupDirection;
    icon?: IconSvgElement;
    className?: string;
    title: string;
}

const LeftPopupControl = ({
                              children,
                              icon = SearchIcon,
                              className = '',
                              title = '',
                          }: PopupToggleProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                panelRef.current &&
                buttonRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getPopupStyle = (): React.CSSProperties => {
        if (!buttonRef.current) return {};
        const buttonRect = buttonRef.current.getBoundingClientRect();
        return {
            position: 'absolute',
            zIndex: 2000,
            left: buttonRect.right,
            top: buttonRect.top,
            transform: 'translateX(10px)',
        }
    };

    return (
        <div className={className} style={{ position: 'relative' }}>
            <IconButton
                icon={icon}
                onClick={togglePanel}
                ref={buttonRef}
                active={isOpen}
            />

            {/* Hidden div that always renders children */}
            <div className={` absolute top-0 left-0 w-0 h-0 p-0 m-0 overflow-hidden clip-rect(0, 0, 0, 0) whitespace-nowrap border-0 `}
                 aria-hidden="true">
                {children}
            </div>

            {isOpen && createPortal(
                <div
                    ref={panelRef}
                    style={getPopupStyle()}
                    className={` bg-gray-100 p-3 rounded-lg shadow-lg overflow-auto max-w-[90vw] max-h-[90vh] `}>
                    <p className={` block text-lg font-medium text-gray-400 mb-1 `}>
                        {title}
                    </p>
                    <div>
                        {children}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
export default LeftPopupControl;
