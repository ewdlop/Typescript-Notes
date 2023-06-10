import { B } from "../type";

//2 - Get Return Type
{
    /**
    Example usage:
    ```
    const fn = (v: boolean) => {
        if (v)
          return 1
        else
          return 2
      }
      
      type a = ReturnType<typeof fn> // should be "1 | 2"
     ```
     */
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

}

//3 - Omit
{
   /**
    * Example usage:
    * ```
    * type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    * interface Todo {
    *    title: string
    *    description: string
    *    completed: boolean
    * }
    * type TodoPreview = Omit<Todo, 'description' | 'title'>
    * const todo: TodoPreview = {
    *    completed: false,
    * }
    * ```
    */
    type Omit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] }
}

//4 - Pick 
{
    /**
     * Example usage:
     * ```
     * interface Todo {
     *     title: string
     *     description: string
     *     completed: boolean
     * }

     * type TodoPreview = Pick<Todo, 'title' | 'completed'>

     * const todo: TodoPreview = {
     *     title: 'Clean room',
     *     completed: false,
     * }
     * ```
     */
    type Pick<T, K> = K extends keyof T ? { [P in K]: T[P] } : never;
}

//7 - Readonly
{
    /**
     * Example usage:
     * ```
     *  interface Todo {
     *  title: string
     *   description: string
     * }

     * const todo: Readonly<Todo> = {
     *   title: "Hey",
     *   description: "foobar"
     * }
     * ```
     */
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }

   
}

//8 - Readonly 2 
{

    /**
     * Example usage:
     * ```
     * interface Todo {
     *    title: string
     *    description: string
     *    completed: boolean
     * }
     * const todo: Readonly2<Todo, 'title' | 'description'> = {
     *   title: "Hey",
     *   description: "foobar",
     *   completed: false,
     * }
     * 
     * todo.title = "Hello" // Error: cannot reassign a readonly property
     * todo.description = "barFoo" // Error: cannot reassign a readonly property
     * todo.completed = true // OK
     * ```
     */
    type Readonly2<T, K extends keyof T = keyof T> = {
        [P in keyof T as P extends K ? never : P]: T[P]
    } & {
        readonly [p in K]: T[p]
    }
}

//9 - Deep Readonly
/**
 * Example usage:
 * ```
 * type X = {
 *   x: {
 *    a: 1
 *    b: 'hi'
 *  }
 *  y: 'hey'
 * }
 * type Expected = {
 *  readonly x: {
 *   readonly a: 1
 *   readonly b: 'hi'
 * }
 *  readonly y: 'hey'
 * }
 * type Todo = DeepReadonly<X> // should be same as `Expected`
 * ```
 */
type DeepReadonly<T> = { readonly [P in keyof T]: T[P] }

//10 - Tuple to Union
/**
 * Example usage:
 * ```
 * type Arr = ['1', '2', '3']
 * 
 * type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
 * ```
 */
type TupleToUnion<T extends any[]> = T[number];

//11 Tuple to Object
/**
 * Example usage:
 * ```
 * const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
 * type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 * ```
 */
type TupleToObject<T extends readonly (string | number)[]> = {
    [P in T[number]]: P;
}

//12 - Chainable Options
/**
 * Example usage:
 * ```
 * declare const config: Chainable
 * 
 * const result = config
 *  .option('foo', 123)
 *  .option('name', 'type-challenges')
 *  .option('bar', { value: 'Hello World' })
 *  .get()
 * 
 * // expect result to be:
 * // {
 * //   foo: number
 * //   name: string
 * //   bar: {
 * //     value: string
 * //   }
 * // }
 * 
 * //expect the type of result to be:
 * interface Result {
 *   foo: number
 *   name: string
 *   bar: {
 *    value: string
 *  }
 * }
 * ```
 */
type Chainable<T = {}> = {
    option: <K extends PropertyKey, V>(key: K extends keyof T ? V extends T[K] ? never : K
        : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
    get: () => T
}

//14 First of Array
/**
 * Example usage:
 * ```
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 * 
 * type head1 = First<arr1> // expected to be 'a'
 * type head2 = First<arr2> // expected to be 3
 * ```
 */
type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never;

//15 - Last of Array
/**
 * Example usage:
 * ```
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 * 
 * type tail1 = Last<arr1> // expected to be 'c'
 * type tail2 = Last<arr2> // expected to be 1
 */
type Last<T extends any[]> = T extends [...any[], infer P] ? P : never;

//16 - Pop
/**
 * Example usage:
 * ```
 * type arr1 = ['a', 'b', 'c', 'd']
 * type arr2 = [3, 2, 1]
 * 
 * type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
 * type re2 = Pop<arr2> // expected to be [3, 2]
 * ```
 */
type Pop<T extends any[]> = T extends [...infer P, any] ? P : never;

//18 Length of Tuple
/**
 * Example usage:
 * ```
 * type tesla = ['tesla', 'model 3', 'model X', 'model Y']
 * type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
 * type LengthOfTesla = Length<tesla>  // expected 4
 * type LengthOfSpaceX = Length<spaceX> // expected 5
 * ```
 */
type Length<T extends any[]> = T['length'];

//20 Promise.all
/**
 * 
 * @param values 
 * Example usage:
 * ```
 * const promise1 = Promise.resolve(3);
 * const promise2 = 42;
 * const promise3 = new Promise<string>((resolve, reject) => {
 *  setTimeout(resolve, 100, 'foo');
 * });
 * 
 * //[] here is a tuple not an array
 * const p = PromiseAll([promise1, promise2, promise3] as const) // expected to be `Promise<[number, number, string]>`
 * ```
 */
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{ [K in keyof T]: T[K] extends Promise<infer P> ? P : T[K] }>;

//43 Exclude
{
    /**
     * Example usage:
     * ```
     * type Result = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
     * ```
     */
    type Exclude<T, U> = T extends U ? never : T;
}

//62 Type Lookup
/**
 * Example usage:
 * ```
 * interface Cat {
 *  type: 'cat'
 *  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
 * }
 * interface Dog {
 *  type: 'dog'
 *  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
 *  color: 'brown' | 'white' | 'black'
 * }
 * type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
 * ```
 */
type LookUp<U, T> = U extends { type: T } ? U : never;

//106 Trim Left
type Space = ' ' | '\n' | '\t'
/**
 * Example usage:
 * ```
 * type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
 * ```
 */
type TrimLeft<T extends string> = T extends `${Space}${infer P}` ? TrimLeft<P> : T;

//108 Trim
/**
 * Example usage:
 * ```
 * type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
 * ```
 */
type Trim<T extends string> = T extends `${Space}${infer P}` | `${infer P}${Space}` ? Trim<P> : T;

{
    
//110 Capitalize
/**
 * Example usage:
 * ```
 * type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
 * ```
 */
    type Capitalize<T extends string> = T extends `${infer P}${infer tail}` ? `${Uppercase<P>}${tail}` : T;
}
//116 Replace
/**
 * Example usage:
 * ```
 * type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
 * ```
 */
type Replace<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer P}${From}${infer tail}` ? `${P}${To}${tail}` : S;

//119 ReplaceAll
/**
 * Example usage:
 * ```
 * type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
 * ```
 */
type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer P}${From}${infer tail}` ? `${P}${To}${ReplaceAll<tail, From, To>}` : S;

//189 Awaited
{
    /**
     * Example usage:
     * ```
     * type X = Promise<string>
     * type ExampleType = Promise<string>
     * type Result = Awaited<ExampleType>
     * ```
     */
    type Awaited<T> = T extends Promise<infer P> ? P : never;
}

//191 Append Argument
/**
 * Example usage:
 * ```
 * type SampleFunction = (id: number, name: string) => number
 * type ResultFunction = AppendParameter<SampleFunction, boolean> 
 * ```
 */
type AppendParameter<OriginalFunction extends (...args: any[]) => any, NewParameter> = 
  OriginalFunction extends (...args: infer ExistingParameters) => infer ReturnType ? 
  (...args: [...ExistingParameters, NewParameter]) => ReturnType : never;

//268 - If
type If<C extends boolean, T, F> = C extends true ? T : F;

//296 - Permutation
/**
 * Example usage:
 * ```
 * type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
 * ```
 */
type Permutation<T, K = T> = [T] extends [never] ? [] : K extends K ? [K, ...Permutation<Exclude<T, K>>] : never;

//298 - Length of String
type LengthOfString<T extends string, U extends string[] = []> = T extends `${infer P}${infer tail}` ? LengthOfString<tail, [...U, P]> : U['length'];

//459 - Medium-Flatten
/**
 * This TypeScript type `Flatten` recursively flattens an array of arrays.
 *
 * The generic parameters are:
 *  - `InputArray` is the input array (which might contain nested arrays)
 *  - `OutputArray` is the output array (which is being built up during the recursion)
 *
 * Example usage::
 * ```
 * type Nested = [1, [2, 3], 4, [5, [6, 7]], 8];
 * type Flat = Flatten<Nested>;  // Flat is now [1, 2, 3, 4, 5, 6, 7, 8]
 * ```
 */
type Flatten<InputArray extends any[], OutputArray extends any[] = []> =
    InputArray extends [infer Head, ...infer Tail] ?
    Head extends any[] ?
    Flatten<[...Head, ...Tail], OutputArray> : Flatten<Tail, [...OutputArray, Head]> : OutputArray;

//527 -  Append to object
/**
 * Example usage:
 * type Test = { id: '1' }
 * type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
 * ```
 */
type AppendToObject<T extends object, U extends string, V> = {
    [P in keyof T | U]: P extends keyof T ? T[P] : V
};

//529 - Absolute
/**
 * Example usage:
 * type Test = -100;
 * type Result = Absolute<Test>; // expected to be "100"
 * ```
 */
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer P}` ? P : `${T}`;

//531 -  String to Union
/**
 * Example usage:
 * type Test = '123';
 * type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
 * ```
 */
type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}` ? Letter | StringToUnion<Rest> : never;

//533 - Concat
/**
 * Example usage:
 * ```
 * type Result = Concat<[1], [2]> // expected to be [1, 2]
 * ```
 */
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

//539 Merge
/**
 * Example usage:
 * ```
 * type Foo = {
 *  a: number;
 *  b: string;
 * };
 * type Bar = {
 *  c: number;
 *  d: boolean;
 * };
 * type merged = Merge<Foo, Bar>; // expected to be { a: number; b: string; c: number; d: boolean }
 * ```
 */
type Merge<T extends object, U extends object> = {
    [P in keyof T | keyof U]: P extends keyof T ? T[P] : P extends keyof U ? U[P] : never
};

//612 - KebabCase
/**
 * Example usage:
 * ```
 * type kebabCase = KebabCase<'FooBarBaz'> // expected to be 'foo-bar-baz'
 * const kebabCase: KebabCase<'FooBarBaz'> = 'foo-bar-baz'
 * type DoNothing = KebabCase<'do-nothing'> // expected to be 'do-nothing'
 * const doNothing: DoNothing = 'do-nothing'
 * ```
 */
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
  ? `${Uncapitalize<S1>}${KebabCase<S2>}`
  : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

//645 - Diff
/**
 * Example usage:
 * ```
 * type Foo = {
 *  name: string;
 *  age: string;
 * };
 * type Bar = {
 *  name: string;
 *  age: string;
 * };
 * type result = Diff<Foo, Bar>; // expected to be {}
 * ```
 */
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>;

//898 - Includes
/**
 * Example usage:
 * ```
 * type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
 * ```
 */
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;

// 949 - AnyOf
/**
 * Example usage:
 * ```
 * type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
 * type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
 * ```
 */
type AnyOf<T extends any[]> = T[number] extends 0 | '' | false | [] | {[key: string]: never}
? false : true;

// 1042 - Never 
/**
 * Example usage:
 * ```
 * type A = IsNever<never>  // expected to be true
 * type B = IsNever<undefined> // expected to be false
 * type C = IsNever<null> // expected to be false
 * type D = IsNever<[]> // expected to be false
 * type E = IsNever<number> // expected to be false
 * ```
 */
type IsNever<T> = [T] extends [never] ? true : false;
 
// 1050 - Push
/**
 * Example usage:
 * ```
 * type Result = Push<[1, 2], '3'> // expected to be [1, 2, '3']
 * ```
 * 
 */
type Push<T extends unknown[], U> = [...T, U];

// 1051 - Unshift
/**
 * Example usage:
 * ```
 * type Result = Unshift<[1, 2], '0'> // expected to be ['0', 1, 2]
 * ```
 */
type Unshift<T extends unknown[], U> = [U, ...T];

// 3312 - Parameters
/**
 * Example usage:
 * ```
 * const processData = (name: string, age: number): void => { }
 * type ProcessDataParamsType = FunctionParameters<typeof processData> // [name: string, age: number]
 * ```
 */
type FunctionParameters<T extends (...args: any) => any> = T extends (...args: infer Params) => any ? Params : never;