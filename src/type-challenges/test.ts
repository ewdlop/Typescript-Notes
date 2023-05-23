import { type } from "os";

//2 - Get Return Type
{
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
    const fn = (v: boolean) => {
        if (v)
          return 1
        else
          return 2
      }
      
      type a = ReturnType<typeof fn> // should be "1 | 2"
}

//3 - Omit
{
    //type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    type Omit<T, K extends keyof T> = {[P in keyof T as P extends K ? never: P] :T[P]}

    interface Todo {
        title: string
        description: string
        completed: boolean
    }
    
    type TodoPreview = Omit<Todo, 'description' | 'title'>

    const todo: TodoPreview = {
        completed: false,
    }
}

//4 - Pick 
{
    type Pick<T,K> =  K extends keyof T ? { [P in K] : T[P] } : never;

    interface Todo {
        title: string
        description: string
        completed: boolean
      }
      
    type TodoPreview = Pick<Todo, 'title' | 'completed'>

    const todo: TodoPreview = {
        title: 'Clean room',
        completed: false,
    }
}

//7 - Readonly
{
    type Readonly<T> = {
        readonly [ P in keyof T]: T[P];
    }

    interface Todo {
        title: string
        description: string
      }
      
      const todo: Readonly<Todo> = {
        title: "Hey",
        description: "foobar"
      }
}

//8 - Readonly 2 
{
    type MyReadonly2<T, K extends keyof T = keyof T> = {
        [P in keyof T as P extends K? never: P]: T[P]
    } & {
        readonly [p in K]: T[p]
    }


    interface Todo {
        title: string
        description: string
        completed: boolean
    }
      
    const todo: MyReadonly2<Todo, 'title' | 'description'> = {
        title: "Hey",
        description: "foobar",
        completed: false,
    }
      
    //todo.title = "Hello" // Error: cannot reassign a readonly property
    //todo.description = "barFoo" // Error: cannot reassign a readonly property
    todo.completed = true // OK
}

//9 - Deep Readonly
type DeepReadonly<T> = {readonly [P in keyof T]: T[P]}
{
    type X = { 
        x: { 
          a: 1
          b: 'hi'
        }
        y: 'hey'
      }
      
      type Expected = { 
        readonly x: { 
          readonly a: 1
          readonly b: 'hi'
        }
        readonly y: 'hey' 
      }
      
      type Todo = DeepReadonly<X> // should be same as `Expected`
}

//10 - Tuple to Union
type TupleToUnion<T extends any[]> = T[number];
{
    type Arr = ['1', '2', '3']

    type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
}

//11 Tuple to Object
type TupleToObject<T extends readonly (string|number)[]> = {
    [ P in T[number]] : P;
}
{
    const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
    type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
}

//12 - Chainable Options
type Chainable<T = {}> = {
    option: <K extends PropertyKey, V>(key: K extends keyof T ? V extends T[K] ? never : K
            : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
    get: () => T
}
{
    // declare const config: Chainable

    // const result = config
    // .option('foo', 123)
    // .option('name', 'type-challenges')
    // .option('bar', { value: 'Hello World' })
    // .get()

    // expect the type of result to be:
    interface Result {
        foo: number
        name: string
        bar: {
            value: string
        }
    }
}

//14 First of Array
type First<T extends any[]> = T extends [ infer P, ...any[]] ? P : never;
{
    type arr1 = ['a', 'b', 'c']
    type arr2 = [3, 2, 1]

    type head1 = First<arr1>
    type head2 = First<arr2>
}

//18 Length of Tuple
type Length<T extends any[]> = T['length'];
{
    type tesla = ['tesla', 'model 3', 'model X', 'model Y']
    type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

    type teslaLength = Length<tesla>  // expected 4
    type spaceXLength = Length<spaceX> // expected 5
}

//43 Exclude
{
    type Exclude<T, U> = T extends U ? never : T;
    type Result = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
}

//189 Awaited
{
    type Awaited<T> = T extends Promise<infer P> ? P : never;
    type ExampleType = Promise<string>
    type Result = Awaited<ExampleType> // expected string
}

//268 - If
type If<C extends boolean, T, F> = C extends true ? T : F;  

//533 - Concat
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
{
    type Result = Concat<[1], [2]> // expected to be [1, 2]
}

//898 - Includes
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
{
    type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
}

// 1050 - Push
type Push<T extends unknown[], U> = [...T, U];
{
    type Result = Push<[1, 2], '3'> // expected to be [1, 2, '3']
}

// 1051 - Unshift
type Unshift<T extends unknown[], U> = [U, ...T];
{
    type Result = Unshift<[1, 2], '0'> // expected to be ['0', 1, 2]
}

// 3312 - Parameters
{
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
    const foo = (arg1: string, arg2: number): void => {}
    type FunctionParamsType = Parameters<typeof foo> // [arg1: string, arg2: number]
}
