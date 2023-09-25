import { pipe } from 'fp-ts/lib/function'

function add1(num: number): number {
    return num + 1
}
   
function multiply2(num: number): number {
    return num * 2
}

function toString(num: number): string {
    return `${num}`
}
   
pipe(1, add1, multiply2, toString) // '4'