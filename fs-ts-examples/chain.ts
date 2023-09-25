import { pipe } from 'fp-ts/function'
import { flow } from 'fp-ts/lib/function'
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
    option.map(({ bar }) => bar),
    option.chain(
      flow(
        option.fromNullable,
        option.map(({ buzz }) => buzz),
      ),
    ),
  )   // { _tag: 'None' }