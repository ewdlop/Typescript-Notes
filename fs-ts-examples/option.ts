import { pipe } from 'fp-ts/function'
import { option } from 'fp-ts'

interface Fizz {
    buzz: string
}

interface Foo {
    bar?: Fizz
}

const foo = { bar: undefined } as Foo | undefined

pipe(foo, option.fromNullable, option.map(({ bar }) => bar)) // { _tag: 'Some', value: 'hello' }
pipe(undefined, option.fromNullable, option.map(({ bar }) => bar))