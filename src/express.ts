"use strict";
import { Scheduler } from "rxjs";
import { Value } from "./value";

export class Expression {
    private fn: (...values: any[]) => any;

    constructor(fn: (...values: any[]) => any) {
        this.fn = fn;
    }

    public run(...values: Array<Value<any>>): Value<any> {
        const observables = values.map(v => v.subject);
        const observable = observables[0]
            .combineLatest(...observables.slice(1))
            .auditTime(0, Scheduler.asap)
            .map(parameters => this.fn.apply(null, parameters));
        return new Value(observable);
    }
}
