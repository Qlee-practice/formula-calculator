"use strict";
import { Expression } from "./src/express";
import { Value } from "./src/value";

const first = new Value();

const second = new Value(1);

const Add = new Expression((...values) => values.reduce((r, i) => r + i, 0));
const Minus = new Expression((...values) => values[0] - values.slice(1).reduce((r, i) => r + i, 0));

const third = Add.run(first, second);

third.subject.subscribe(value => console.log("third", value));

const forth = Add.run(new Value(3), third);

forth.subject.subscribe(value => console.log("forth", value));

const fifth = Minus.run(forth, third);

fifth.subject.subscribe(value => console.log("fifth", value));

first.set(2);

second.set(55);

second.set(22);

first.set(11);

setTimeout(() => forth.set(55), 500);

setTimeout(() => console.log(forth.value), 1000);
