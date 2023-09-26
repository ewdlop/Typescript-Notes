import { pipe } from 'fp-ts/lib/function'
import { Task, MonadTask, fromIO, bindTo, bind, chainFirst,  } from 'fp-ts/lib/Task'
import { Do } from 'fp-ts-contrib/lib/Do'
import { log } from 'fp-ts/lib/Console'
import { TaskEither, fromTask } from 'fp-ts/lib/TaskEither'
import * as TE from 'fp-ts/lib/TaskEither'

// filler values for brevity
type A = 'A'
type B = 'B'
type C = 'C'
type D = 'D'

declare const fa: () => Task<A>
declare const fb: (a: A) => Task<B>
declare const fc: (ab: { a: A; b: B }) => Task<C>
declare const fd: (ab: { a: A; b: B; c: C }) => TaskEither<D, Error>



Do(MonadTask)
  .bind('a', fa()) // task
  .bindL('b', ({ a } /* context */) => fb(a)) // lazy task
  .bindL('c', fc) // lazy task
  .return(({ c }) => c) // Task<"C">

  Do(MonadTask)
  .bind('a', fa())
  .bindL('b', ({ a }) => fb(a))
  .doL(({ b }) => pipe(log(b), fromIO)) // 👈 side effect
  .bindL('c', fc)
  .return(({ c }) => c)

  pipe(
    bindTo('a')(fa()),
    bind('b', ({ a }) => fb(a)),
    chainFirst(({ b }) => pipe(log(b), fromIO)),
    bind('c', ({ a, b }) => fc({ a, b })),
    fromTask,
    TE.bind('d', ({ a, b, c }) => fd({ a, b, c })),
    TE.map(({ d }) => d),
  )