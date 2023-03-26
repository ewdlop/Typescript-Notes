import { CreateArrayFunc, Lengthwise } from "./interface";

export function swap<T, U>({ tuple }: { tuple: [T, U]; }): [U, T] {
    return [tuple[1], tuple[0]];
}

export function createAnyArray({ length, value }: { length: number; value: any; }): Array<any> {
    return Array(length).fill(value);
}

export function createArray<T>({ length, value }: { length: number; value: T; }): Array<T> {
    return Array(length).fill(value);
}
export function someFunc<T extends Lengthwise>({ arg }: { arg: T; }): T {
    console.log(arg.length);
    return arg;
}

let createArray2: CreateArrayFunc;
createArray2 = function <T>({length, value}:{length: number, value: T}): Array<T> {
    return Array(length).fill(value);
}
function createArray3<T>({ length, value }: { length: number; value: T; }): Array<T> {
    return Array(length).fill(value);
}
