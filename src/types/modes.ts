export interface ModeManager {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export interface Mode {
    name: string;
    handleDragging(e: MouseEvent): void;
    handleClick(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
}