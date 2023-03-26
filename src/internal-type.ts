//type Extract<T, U> = T extends U ? never : T
let foo: Extract<'a' | 'b' | 'c', 'b'> = 'b'

let foo2: Exclude<'a' | 'b' | 'c', 'b'> = 'a'
foo2 = 'c'
