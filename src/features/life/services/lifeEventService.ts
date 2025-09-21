class LifeEventService {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  notifyLifeChanged() {
    this.listeners.forEach((callback) => callback());
  }
}

export const lifeEventService = new LifeEventService();
