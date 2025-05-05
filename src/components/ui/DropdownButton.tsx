import {useState, useRef, useEffect} from "react";
import {HugeiconsIcon, IconSvgElement} from "@hugeicons/react";
import IconButton from "./IconButton";

interface DropdownButtonProps<T> {
    items: { key: string; value: T; name: string }[];
    selectedItem: T;
    onSelect: (item: T) => void;
    getIcon: (item: T) => IconSvgElement;
    isActive?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

function DropdownButton<T>({
                               items,
                               selectedItem,
                               onSelect,
                               getIcon,
                               isActive = false,
                               size = 'md'
                           }: DropdownButtonProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex">
                <IconButton
                    icon={getIcon(selectedItem)}
                    onClick={() => onSelect(selectedItem)}
                    active={isActive}
                    size={size}
                    className={`rounded-r-none`}
                />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={` shadow-sm flex items-center hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all duration-100 ease-in-out justify-center w-[20px] h-[40px] rounded-r-xl
                        ${isActive ? 'text-white bg-blue-500' : 'text-gray-700 bg-white'}
                    `}
                >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg">
                    {items.map(item => (
                        <button
                            key={item.key}
                            className="w-full flex flex-row gap-2 text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                onSelect(item.value);
                                setIsOpen(false);
                            }}
                        >
                            <HugeiconsIcon
                                icon={getIcon(item.value)}
                                strokeWidth={2}
                                size={18}
                                className={` transition-all duration-100 `}
                            />
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownButton;