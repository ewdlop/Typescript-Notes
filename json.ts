import { Person } from "./immutables";

{
    const personJson = '{"name": "John", "age": 30}';
    const person: Person = JSON.parse(personJson);
    console.log(person.name); // Output: "John"
    console.log(person.age); // Output: 30
}