import { pipe } from 'fp-ts/lib/function';
import { Option, ap, of } from 'fp-ts/lib/Option';

declare function write(key: string, value: string, flush: boolean): unknown;

// For writeC
const writeC = (key: string) => (value: string) => (flush: boolean) =>
  write(key, value, flush);

let result = pipe(of(writeC), ap(of('key')), ap(of('value')), ap(of(true))); // should give the result of write function or None if any of the Option values are None.

// For fooC
declare const a: Option<number>;
declare const b: Option<string>;
declare function foo(a: number, b: string): boolean;

const fooC = (a: number) => (b: string) => foo(a, b);

let result2 = pipe(of(fooC), ap(a), ap(b)); // Option<boolean>

declare function bar(a: boolean): object

const fooOption = pipe(of(fooC), ap(a), ap(b))

// Option<object>
let result3 = pipe(of(bar), ap(fooOption))