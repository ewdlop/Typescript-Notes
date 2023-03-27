import { NameResolver } from "./type";

export interface Empty<T> { }


export interface NotEmpty<T> {
    data: T;
}

export interface Chatroom {
    connect(...args: [] | []): void;
}

export interface Shop {
    buy(): void;
}


export interface A {
    [key: string]: any;
}


export interface CreateArrayFunc {
    <T>({ length, value }: { length: number, value: T }): Array<T>;
}

export interface CreateArrayFunc2<T> {
    (length: number, value: T): Array<T>;
}

export interface Lengthwise {
    length: number;
}

export interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

export interface Test<T extends () => void> {
    test: T;
}

export interface Test2 extends Test<() => void> {
}

export interface NameResolver2 extends NameResolver {
}