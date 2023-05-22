import { type } from "os";

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

//11 Tuple to Object
type TupleToObject<T extends readonly (string|number)[]> = {
    [ P in T[number]] : P;
}
{
    const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
    type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
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
{
    type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];
    type Result = Concat<[1], [2]> // expected to be [1, 2]
}
