import { pipe } from 'fp-ts/lib/function'
import { left, right } from 'fp-ts/lib/Either'
import { partitionMap, foldMap } from 'fp-ts/lib/Array'
import { Monoid, monoidSum } from 'fp-ts/lib/Monoid'
import { Semigroup } from 'fp-ts/lib/Semigroup'

type Foo = {
    readonly _tag: 'Foo'
    readonly f: () => number
  }
  
  type Bar = {
    readonly _tag: 'Bar'
    readonly g: () => number
  }
  
  declare const arr: Array<Foo | Bar>

const semigroupMax: Semigroup<number> = {
    concat: Math.max,
}
  
const monoidMax: Monoid<number> = {
  concat: semigroupMax.concat,
  empty: Number.NEGATIVE_INFINITY,
}

const compute = (fooMonoid: Monoid<number>, barMonoid: Monoid<number>) => (
    arr: Array<Foo | Bar>,
  ) =>
    pipe(
      partitionMap((a: Foo|Bar) =>
        a._tag === 'Foo' ? left(a) : right(a),
      )(arr),
      ({ left: foos, right: bars }) => {
        const sum = foldMap(fooMonoid)((foo : Foo) => foo.f())(foos)
        const max = foldMap(barMonoid)((bar : Bar) => bar.g())(bars)
  
        return sum * max
      },
    )
  
  declare const i: number
  if (i % 2 === 0) {
    compute(monoidSum, monoidMax)
  } else {
    compute(monoidMax, monoidSum)
  }