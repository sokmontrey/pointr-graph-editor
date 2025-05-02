import React, {useState, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {HugeiconsIcon, IconSvgElement} from "@hugeicons/react";
import {SearchIcon} from "@hugeicons/core-free-icons";

export type PopupDirection = 'top' | 'right' | 'bottom' | 'left';

export interface PopupToggleProps {
    children: React.ReactNode;
    direction?: PopupDirection;
    icon?: IconSvgElement;
    className?: string;
}

const LeftPopupControl = ({
                              children,
                              icon = SearchIcon,
                              className = '',
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
        <div className={`popup-toggle ${className}`} style={{position: 'relative'}}>
            <button
                ref={buttonRef}
                onClick={togglePanel}
                className="popup-toggle-button"
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <HugeiconsIcon icon={icon}
                               strokeWidth={2}
                               size={32}
                />
            </button>

            {/* Hidden div that always renders children */}
            <div style={hiddenChildrenStyle} aria-hidden="true">
                {children}
            </div>

            {isOpen && createPortal(
                <div
                    ref={panelRef}
                    className="popup-panel"
                    style={{
                        ...getPopupStyle(),
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflow: 'auto',
                    }}
                > {children} </div>,
                document.body
            )}
        </div>
    );
}

const hiddenChildrenStyle: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
};

export default LeftPopupControl;
