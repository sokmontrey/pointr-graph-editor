import { InteractionListener } from "../types/Interaction";

const useInteractionHandler = () => {
  const listeners: InteractionListener[] = [];

  const on = (event: string, handler: (e: any) => void) => {
    listeners.push({ event, handler });
  };

  const off = (event: string, handler: (e: any) => void) => {
    const index = listeners
      .findIndex(
        sub => sub.event === event &&
          sub.handler === handler);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };

  const triggerEvent = (event: string, data?: any) => {
    listeners
      .filter(sub => sub.event === event)
      .forEach(sub => sub.handler(data));
  };

  return {
    on,
    off,
    triggerEvent,
  };
};

export default useInteractionHandler;
