import { useState, useEffect } from 'react';
import { Vec2 } from '../../utils/vector';
import DragNumberInput from './DragNumberInput';

interface VectorInputProps {
    value: Vec2;
    onChange: (value: Vec2) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    disabled?: boolean;
}

const VectorInput = ({
    value,
    onChange,
    min = -1000,
    max = 1000,
    step = 1,
    label,
    disabled = false,
}: VectorInputProps) => {
    const [localValue, setLocalValue] = useState<Vec2>(value.clone());

    useEffect(() => {
        setLocalValue(value.clone());
    }, [value]);

    const handleXChange = (newX: number) => {
        const newPoint = new Vec2(newX, localValue.y);
        setLocalValue(newPoint);
        onChange(newPoint);
    };

    const handleYChange = (newY: number) => {
        const newPoint = new Vec2(localValue.x, newY);
        setLocalValue(newPoint);
        onChange(newPoint);
    };

    return (
        <div className="vector-input">
            {label && <label className="vector-label">{label}</label>}
            <div className="vector-controls">
                <div className="vector-x">
                    <DragNumberInput
                        label="X"
                        value={localValue.x}
                        onChange={handleXChange}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                    />
                </div>
                <div className="vector-y">
                    <DragNumberInput
                        label="Y"
                        value={localValue.y}
                        onChange={handleYChange}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default VectorInput;