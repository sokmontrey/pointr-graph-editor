import { useState } from 'react';
import { Mode, ModeType } from '../types/Mode';
import SelectMode from '../modes/SelectMode';

export const useModeManager = () => {
    const [ mode, setMode ] = useState<Mode>(new SelectMode());

    const switchMode = (modeName: string) => {
        switch (modeName) {
            case ModeType.SELECT:
                setMode(new SelectMode());
                break;
            default:
                break;
        }
    };

    return {
        mode,
        switchMode,
    }
}