{
    const person = { name: 'John', age: 30 };
    const updatedPerson = { ...person, age: 31 };
    const updatedPerson2 = Object.assign({}, person, { age: 31 }); //target, source, source2, source3, ...sourceN

    const numbers = [1, 2, 3];
    const updatedNumbers = [...numbers.slice(0, 1), 4, ...numbers.slice(2)];
    const updatedNumbers2 = numbers.map((n, i) => i === 1 ? 4 : n);
}
