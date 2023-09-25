import { flow } from 'fp-ts/lib/function'


function add1(num: number): number {
    return num + 1
}
   
function multiply2(num: number): number {
    return num * 2
}

function toString(num: number): string {
    return `${num}`
}

function concat(a: number, transformer: (a: number) => string): [number, string] {
    return [a, transformer(a)]
}

flow(add1, multiply2, toString)(1) // t

concat(1, flow(add1, multiply2, toString)) // [1, '4']