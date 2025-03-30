// Add testing library extensions
import '@testing-library/jest-dom';

// Mock canvas methods that aren't implemented in jsdom
HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation(() => ({
    clearRect: jest.fn(),
    save: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    restore: jest.fn(),
}));
