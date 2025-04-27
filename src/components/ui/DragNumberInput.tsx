import { useState, useEffect, useRef } from 'react';

interface DragNumberInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    disabled?: boolean;
    dragSensitivity?: number; 
}

const DragNumberInput = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    disabled = false,
    dragSensitivity = 0.5, 
}: DragNumberInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value.toString());
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [startValue, setStartValue] = useState<number>(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleDragEnd);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleDragEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleDragEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, startX, startValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue)) {
            onChange(Math.min(max, Math.max(min, newValue)));
        }
    };

    const handleBlur = () => {
        const newValue = parseFloat(inputValue);
        if (isNaN(newValue)) {
            setInputValue(value.toString());
        } else {
            const clampedValue = Math.min(max, Math.max(min, newValue));
            setInputValue(clampedValue.toString());
            onChange(clampedValue);
        }
    };

    const handleDragStart = (clientX: number, e?: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;
        if (e) e.preventDefault(); // Prevent text selection during drag
        setIsDragging(true);
        setStartX(clientX);
        setStartValue(value);
        document.body.style.userSelect = 'none';

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        handleDragStart(e.clientX, e);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, e);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        updateValueFromDrag(deltaX);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        updateValueFromDrag(deltaX);
    };

    const updateValueFromDrag = (deltaX: number) => {
        const delta = Math.round(deltaX * dragSensitivity / step) * step;
        const newValue = Math.min(max, Math.max(min, startValue + delta));
        onChange(newValue);
    };

    return (
        <div>
            <div>
                {label && <label>{label}</label>}
                <input
                    ref={inputRef}
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    style={{ cursor: disabled ? 'not-allowed' : 'ew-resize' }}
                />
            </div>
        </div>
    );
};

export default DragNumberInput;
