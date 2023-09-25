{
    const person = { name: 'John', age: 30 };
    const person2 = { name: 'John', age: 30, test: {
        x: 0,
    } };
    

    // Output: ['name', 'age']
    const keys = Object.keys(person);

    // Output: ['John', 30]
    const values = Object.values(person);

    // Output: [['name', 'John'], ['age', 30]]
    const entries = Object.entries(person);

    const clone = Object.assign({}, person);

    //this is not a deep clone (only one level deep) so it will not work well for nested objects
    const freeze = Object.freeze(person);
    const freeze2 = Object.freeze(person2);
    freeze2.test.x = 1;

}