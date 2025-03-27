import { useState } from 'react';
import { Mode } from '../types/Mode';

export function useModeManager(initialMode: Mode) {
  const [mode, setMode] = useState<Mode>(initialMode);

  return {
    mode,
    setMode,
  };
}
