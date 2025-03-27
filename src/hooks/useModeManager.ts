import { useState } from 'react';
import { Mode } from '../types/Mode';
import SelectMode from '../cores/modes/SelectMode';

export function useModeManager(initialMode: Mode = new SelectMode()) {
  const [mode, setMode] = useState<Mode>(initialMode);

  return {
    mode,
    setMode,
  };
}
