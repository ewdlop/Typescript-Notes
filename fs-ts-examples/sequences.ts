import { pipe } from 'fp-ts/lib/function'
import { sequence, traverse } from 'fp-ts/lib/Array'
import { of, Apply, map, Applicative } from 'fp-ts/lib/Option'
import { sequenceT, sequenceS } from 'fp-ts/lib/Apply'
import * as E from 'fp-ts/lib/Either'
import { TaskEither, chain, ApplicativeSeq } from 'fp-ts/lib/TaskEither'

const arr = [1, 2, 3].map(of)
sequence(Applicative)(arr) 

declare function foo(a: number, b: string): boolean
declare function bar(a: boolean): object

// Option<object>
pipe(
  sequenceT(Apply)(of(123), of('asdf')),
  map((args) => foo(...args)),
  map(bar),
)

type RegisterInput = {
  email: string
  password: string
}

declare function validateEmail(email: string): E.Either<Error, string>
declare function validatePassword(password: string): E.Either<Error, string>
declare function register(input: RegisterInput): unknown

declare const input: RegisterInput

let result4 = pipe(
  input,
  ({ email, password }) =>
    sequenceS(E.Apply)({
      email: validateEmail(email),
      password: validatePassword(password),
    }),
  E.map(register),
)


declare const getPartIds: () => TaskEither<Error, string[]>
declare const getPart: (partId: string) => TaskEither<Error, Blob>

// ✅ TE.TaskEither<Error, Blob[]>
let result5 = pipe(getPartIds(), chain(traverse(ApplicativeSeq)(getPart)))