"use strict";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

export class Value<T> {

    public readonly subject: BehaviorSubject<T>;
    private subscription?: Subscription;

    constructor(initialValue: T = null) {
        if (initialValue instanceof Observable) {
            this.subject = new BehaviorSubject<T>(null);
            this.subscription = initialValue.subscribe(this.subject);
        } else {
            this.subject = new BehaviorSubject<T>(initialValue);
        }
    }

    public set(value: T): void {
        this.subject.next(value);
    }

    public get value(): T {
        return this.subject.value;
    }

    public destroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
        this.subject.complete();
    }
}
