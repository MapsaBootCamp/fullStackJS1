type EventTypeLisener = {
  [eventType: string]: MyEventListener[];
};

class EventManager {
  private listeners: EventTypeLisener;

  constructor() {
    this.listeners = {};
  }

  addEventType(eventType: string) {
    if (!this.checkEventExistance(eventType)) {
      this.listeners[eventType] = [];
    }
  }

  checkEventExistance(eventType: string): boolean {
    return Object.keys(this.listeners).includes(eventType);
  }

  subscribe(eventType: string, listener: MyEventListener) {
    if (this.checkEventExistance(eventType)) {
      this.listeners[eventType].push(listener);
    } else {
      console.log(`invalid ${eventType} event`);
    }
  }

  unSubscribe(eventType: string, listener: MyEventListener) {
    if (this.checkEventExistance(eventType)) {
      const index = this.listeners[eventType].indexOf(listener);
      this.listeners[eventType].splice(index, 1);
    }
  }

  notify(event: string, message: string) {
    for (const listener of this.listeners[event]) {
      listener.update(message);
    }
  }
}

interface MyEventListener {
  update(eventMessage: string): void;
}

class EmailAlertListener implements MyEventListener {
  update(eventMessage: string): void {
    console.log(`emailed message: ${eventMessage}`);
  }
}

class LogListener implements MyEventListener {
  update(eventMessage: string): void {
    console.log(`logged message: ${eventMessage}`);
  }
}

const eventManager = new EventManager();
eventManager.addEventType("ERROR");
eventManager.addEventType("INFO");

const emailAlertObj = new EmailAlertListener();
const logObj = new LogListener();

eventManager.subscribe("INFO", emailAlertObj);
eventManager.subscribe("ERROR", emailAlertObj);
eventManager.subscribe("ERROR", logObj);

console.log("ERROR rokh dad");
eventManager.notify("ERROR", "error rokh dad");

console.log("INFO rokh dad");
eventManager.notify("INFO", "info rokh dad");

eventManager.unSubscribe("ERROR", emailAlertObj);
console.log("ERROR rokh dad");
eventManager.notify("ERROR", "error rokh dad");
