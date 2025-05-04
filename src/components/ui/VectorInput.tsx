import {useState, useEffect} from 'react';
import {Vec2} from '../../utils/vector.ts';
import DragNumberInput from './DragNumberInput.tsx';

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
        <div>
            {label &&
                <label
                    className={` block text-sm font-medium text-gray-700 mb-1 `}>
                    {label}
                </label>}
            <div className={` flex flex-row gap-2 w-full `}>
                <DragNumberInput
                    label="X"
                    value={localValue.x}
                    onChange={handleXChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                />
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
    );
};

export default VectorInput;