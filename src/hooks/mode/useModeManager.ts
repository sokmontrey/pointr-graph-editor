import { useState } from 'react';
import { Mode, ModeManager } from '../../types';

export function useModeManager(
    initialMode: Mode
): ModeManager {
    const [mode, setMode] = useState<Mode>(initialMode);

    return {
        mode,
        setMode,
    };
}
