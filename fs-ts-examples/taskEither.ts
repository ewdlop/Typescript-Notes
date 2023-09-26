import axios from 'axios'
import { absurd, constVoid, pipe, unsafeCoerce } from 'fp-ts/lib/function'
import { tryCatch, map, fold, left, chain, orElse } from 'fp-ts/lib/TaskEither'
import { of } from 'fp-ts/lib/Task'

(async () => {
  const ok = await pipe(
    tryCatch(
      () => axios.get('https://httpstat.us/200'),
      (reason) => new Error(`${reason}`),
    ),
    map((resp) => resp.data),
  )()

  console.log(ok)
  // { _tag: 'Right', right: { code: 200, description: 'OK' } }
})()

type Resp = { code: number; description: string }
const result = pipe(
  tryCatch(
    () => axios.get('https://httpstat.us/200'),
    () => constVoid() as never,
  ), // TaskEither<never, AxiosResponse<any, any>>
  map((resp) => unsafeCoerce<unknown, Resp>(resp.data)), // TaskEither<never, Resp>
  fold(absurd, of), // Task<Resp>
)

declare function begin(): Promise<void>
declare function commit(): Promise<void>
declare function rollback(): Promise<void>

const result2 = pipe(
  tryCatch(
    () => begin(),
    (err) => new Error(`begin txn failed: ${err}`),
  ),
  chain(() =>
    tryCatch(
      () => commit(),
      (err) => new Error(`commit txn failed: ${err}`),
    ),
  ),
  orElse((originalError) =>
    pipe(
      tryCatch(
        () => rollback(),
        (err) => new Error(`rollback txn failed: ${err}`),
      ),
      fold(left, () => left(originalError)),
    ),
  ),
)