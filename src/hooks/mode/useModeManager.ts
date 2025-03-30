import { useState } from 'react';
import { Mode } from '../../types';

export function useModeManager(initialMode: Mode) {
  const [mode, setMode] = useState<Mode>(initialMode);

  return {
    mode,
    setMode,
  };
}
