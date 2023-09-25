import { Task, of } from 'fp-ts/lib/Task'

async function asyncFunction() {}

const boolTask: Task<boolean> = async () => {
  try {
    await asyncFunction()
    return true
  } catch (err) {
    return false
  }
}


const foo = 'asdf' // string
const bar = of(foo) // T.Task<string>

// Same As
const fdsa: Task<string> = () => Promise.resolve(foo)