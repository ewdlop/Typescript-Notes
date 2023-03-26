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
    <T>({length, value}:{length: number, value: T}): Array<T>;
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