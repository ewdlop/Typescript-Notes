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

//14 First of Array
type First<T extends any[]> = T extends [ infer P, ...any[]] ? P : never;
{
    type arr1 = ['a', 'b', 'c']
    type arr2 = [3, 2, 1]

    type head1 = First<arr1>
    type head2 = First<arr2>
}

//268 - If
type If<C extends boolean, T, F> = C extends true ? T : F;  

