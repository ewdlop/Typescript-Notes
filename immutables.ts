export interface Person {
  readonly name: string;
  age: number;
}
{
  const name: string = 'John'; // name is immutable

  const person: Person = { name: 'John', age: 30 };
  
  const freezePerson = Object.freeze({ name: 'John', age: 30 });
}

//deep freeze
export const deepFreeze = (o: any) => {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
      && o[prop] !== null
      && (typeof o[prop] === "object" || typeof o[prop] === "function")
      && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}