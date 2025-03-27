export interface InteractionSubscriber {
  event: string;
  handler: (e: any) => void;
} // TODO: move to types

const useInteractionHandler = () => {
  const subscribers: InteractionSubscriber[] = [];

  const attachListener = (event: string, handler: (e: any) => void) => {
    subscribers.push({ event, handler });
  };

  const detachListener = (event: string, handler: (e: any) => void) => {
    const index = subscribers
      .findIndex(
        sub => sub.event === event &&
          sub.handler === handler);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };

  const triggerEvent = (event: string, data?: any) => {
    subscribers
      .filter(sub => sub.event === event)
      .forEach(sub => sub.handler(data));
  };

  return {
    attachListener,
    detachListener,
    triggerEvent,
  };
};

export default useInteractionHandler;
