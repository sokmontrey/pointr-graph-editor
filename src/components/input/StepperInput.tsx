import { useState, useEffect } from 'react';

interface StepperInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
}

const StepperInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
}: StepperInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

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

  const increment = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  return (
    <div className="stepper-input">
      {label && <label>{label}</label>}
      <div className="stepper-controls">
        <button 
          type="button" 
          onClick={decrement} 
          disabled={disabled || value <= min}
        >
          -
        </button>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <button 
          type="button" 
          onClick={increment} 
          disabled={disabled || value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default StepperInput;