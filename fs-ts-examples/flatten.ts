import { pipe } from 'fp-ts/function'
import { option } from 'fp-ts'

interface Fizz {
    buzz: string
}

interface Foo {
    bar?: Fizz
}

const foo = { bar: undefined } as Foo | undefined

let s = pipe(
    foo,
    option.fromNullable,
    option.map(({ bar }) =>
      pipe(
        bar,
        option.fromNullable,
        option.map(({ buzz }) => buzz),
      ),
    ),
    option.flatten,
)  // { _tag: 'None' }