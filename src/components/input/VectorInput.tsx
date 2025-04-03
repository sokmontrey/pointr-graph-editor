import { useState, useEffect } from 'react';
import { Point } from '../../utils/point';
import StepperInput from './StepperInput';

interface VectorInputProps {
    value: Point;
    onChange: (value: Point) => void;
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
    const [localValue, setLocalValue] = useState<Point>(value.clone());

    useEffect(() => {
        setLocalValue(value.clone());
    }, [value]);

    const handleXChange = (newX: number) => {
        const newPoint = new Point(newX, localValue.y);
        setLocalValue(newPoint);
        onChange(newPoint);
    };

    const handleYChange = (newY: number) => {
        const newPoint = new Point(localValue.x, newY);
        setLocalValue(newPoint);
        onChange(newPoint);
    };

    return (
        <div className="vector-input">
            {label && <label className="vector-label">{label}</label>}
            <div className="vector-controls">
                <div className="vector-x">
                    <StepperInput
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
                    <StepperInput
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