import { Empty } from "./class";
import { NotEmpty } from "./interface";

export type WindowStates = "open" | "closed" | "minimized";
export type LockStates = "locked" | "unlocked";
export type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

export type Name = string;
export type NameResolver = () => string;
export type NameOrResolver = Name | NameResolver;

export type StringArray = Array<string>;
export type NumberArray = Array<number>;
export type ObjectWithNameArray = Array<{ name: string }>;

export type Animal = {
    name: string;
    age: number;
};

export type Dog = Animal & {
    breed: string;
};

export type Cat = Animal & {
    color: string;
};

export type DogOrCat = Dog | Cat;

export type ToBeEmptyOrNotToBeEmpty<T> = Empty | NotEmpty<T>;

export type B = {
    [key in 'a' | 'b' | 'c']: string;
}