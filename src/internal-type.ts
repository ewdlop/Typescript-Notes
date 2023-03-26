{
    //type Extract<T, U> = T extends U ? never : T
    let foo: Extract<'a' | 'b' | 'c', 'b'> = 'b'

    let foo2: Exclude<'a' | 'b' | 'c', 'b'> = 'a'
    foo2 = 'c'


    const foo3: Record<string, boolean> = {
        a: true
    };
      
    const foo4: Record<'x' | 'y', number> = {
        x: 1,
        y: 2
    };

    interface Foo {
        a: string;
        b: number;
    }

    const foo5: Partial<Foo> = {
        b: 2 
    }  

    const foo6: Required<Foo> = {
        a: 'a',
        b: 2
    } 
    
    const foo7: Readonly<Foo> = {
        a: 'a',
        b: 2
    }  

    const foo8: Pick<Foo, 'b'> = {
        b: 1
    };


    //type Parameters<T extends (...args: any) => any> =
      //T extends (...args: infer P) => any ? P : never

    type Foo2 = (a: string, b: number) => void
    const a: Parameters<Foo2> = ['a', 1] // [string, number]

    //type ReturnType<T extends (...args: any) => any> =
        //T extends (...args:any) => infer R ? R : any
    type Foo3 = () => boolean
    const a1: ReturnType<Foo3> = true
}
