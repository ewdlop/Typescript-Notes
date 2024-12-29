# Typescript-Notes

<https://github.com/gcanti/fp-ts>

<https://github.com/type-challenges/type-challenges>

## Project Description

The `Typescript-Notes` repository is a collection of TypeScript code examples and notes. It serves as a reference for various TypeScript features, patterns, and libraries.

## Setup Instructions

To set up the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/ewdlop/Typescript-Notes.git
   cd Typescript-Notes
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Run the project:
   ```sh
   npm start
   ```

## Project Structure

The repository contains the following TypeScript files:

- `basic.ts`: Demonstrates basic TypeScript features such as tuples, classes, and type assertions.
- `class.ts`: Contains examples of TypeScript classes, including inheritance and abstract classes.
- `copyingSample.ts`: Shows examples of copying objects and arrays using spread syntax and `Object.assign`.
- `fs-ts-examples/`: A directory containing various examples using the `fp-ts` library.
- `function.ts`: Demonstrates TypeScript functions, including function types and `this` context.
- `generics-function.ts`: Contains examples of generic functions in TypeScript.
- `immutables.ts`: Shows examples of immutable objects and deep freezing.
- `interface.ts`: Contains examples of TypeScript interfaces and their usage.
- `internal-type.ts`: Demonstrates TypeScript's built-in utility types.
- `json.ts`: Shows examples of working with JSON in TypeScript.
- `lambda-calculus.ts`: Contains examples of lambda calculus in TypeScript.
- `mixins.ts`: Demonstrates mixins in TypeScript.
- `monad.ts`: Contains examples of monads in TypeScript.
- `namespace.ts`: Shows examples of TypeScript namespaces.
- `no-type.d.ts` and `no-type.js`: Demonstrates using TypeScript with JavaScript files.
- `object.ts`: Contains examples of working with objects in TypeScript.
- `refinement-type.ts`: Demonstrates refinement types in TypeScript.
- `subtype-assignment.ts`: Shows examples of subtype assignments in TypeScript.
- `tree.ts`: Contains examples of tree data structures in TypeScript.
- `type-challenges/`: A directory containing solutions to various TypeScript type challenges.
- `type.ts`: Demonstrates various TypeScript type definitions.

## Usage Examples

Here are some usage examples demonstrating how to use the code in the repository:

### Example 1: Using Classes

```typescript
import { Animal, Cat } from './class';

const animal = new Animal('Jack');
const cat = new Cat('Tom');

console.log(animal.name); // Output: Jack
cat.eat(); // Output: Tom is eating.
```

### Example 2: Using Functions

```typescript
import { test } from './function';

test('John'); // Output: Hello: John
```

### Example 3: Using Generics

```typescript
import { createArray } from './generics-function';

const numberArray = createArray({ length: 3, value: 42 });
console.log(numberArray); // Output: [42, 42, 42]
```

## Dependencies

The project has the following dependencies listed in the `package.json` file:

- `@types/node`: TypeScript definitions for Node.js.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `fp-ts`: Functional programming library for TypeScript.
- `fp-ts-contrib`: Additional utilities for `fp-ts`.
- `ts-node`: TypeScript execution environment for Node.js.
- `typescript`: TypeScript language.
- `nodemon`: Utility that monitors for changes in source code and automatically restarts the server.
- `@types/express`: TypeScript definitions for Express.js.
