interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

class Subject implements ISubject {
  public state = 0;
  private _observers: IObserver[] = [];

  attach(observer: IObserver) {
    const isExist = this._observers.includes(observer);
    if (isExist) {
      console.log(
        `Subject: Observer (${observer.constructor.name}) has been attached already`,
      );
      return;
    }

    console.log(`Subject: Attached an observer (${observer.constructor.name})`);
    this._observers.push(observer);
  }

  detach(observer: IObserver) {
    const observerIndex = this._observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log(
        'Subject: Observer does not exist or has been detached already.',
      );
      return;
    }
    this._observers.splice(observerIndex, 1);
    console.log(`Subject: Detached an observer (${observer.constructor.name})`);
  }

  notify() {
    console.log(`Subject: notifying observers...`);
    for (const observer of this._observers) {
      observer.update(this);
    }
  }

  updateState() {
    this.state = Math.floor(Math.random() * 10);
    console.log(`Subject: Updated my state to ${this.state}`);
    this.notify();
  }
}

interface IObserver {
  update(subject: ISubject): void;
}

class ObserverOne implements IObserver {
  update(subject: ISubject): void {
    console.log('ObserverOne: reacted to the event.');
    // if (subject.state === 0 || subject.state >= 0) {
    //   console.log('ObserverOne: reacted to the event');
    // }
  }
}

class ObserverTwo implements IObserver {
  update(subject: ISubject) {
    console.log('ObserverTwo: reacted to the event.');
  }
}
const subject = new Subject();

const observer1 = new ObserverOne();
const observer2 = new ObserverTwo();

subject.attach(observer1);
subject.updateState();

// subject.detach(observer1);
// subject.detach(observer1);

subject.attach(observer2);
subject.updateState();
