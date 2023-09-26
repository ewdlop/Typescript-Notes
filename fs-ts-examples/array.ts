import { pipe } from 'fp-ts/lib/function'
import { map, filter, reduce, zip, lookup, head, isNonEmpty } from 'fp-ts/lib/Array'
import * as NEA from 'fp-ts/lib/NonEmptyArray'

const foo = [1, 2, 3, 4, 5]

const sum = pipe(
  foo,
  map(x => x - 1),
  filter((x) => x % 2 === 0),
  reduce(0, (prev, next) => prev + next),
)
console.log(sum) // 6

const foo2 = [1, 2, 3]
const bar = ['a', 'b', 'c']

const zipped = pipe(foo2, zip(bar))
console.log(zipped) // [[1, 'a'], [2, 'b'], [3, 'c']]

pipe([1, 2, 3], lookup(1)) // { _tag: 'Some', value: 2 }
pipe([1, 2, 3], lookup(3)) // { _tag: 'None' }

const foo3 = [1, 2, 3]
if (foo3.length > 0) {
  // We don't want an Option since we know it will always be some
  const firstElement = head(foo3) // { _tag: 'Some', value: 1 }
}


const foo4 = [1, 2, 3]
if (isNonEmpty(foo4)) {
  const firstElement = NEA.head(foo4) // 1
}