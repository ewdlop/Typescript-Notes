import { Animal, Car, Cat, Golfer } from "./class";
import { fn } from "./function";
import { Shapes } from "./namespace";
import polygons = Shapes.Polygons;
import { doSomething }  from "./no-type";
import { NameOrResolver } from "./type";

{
    //tuple
    const john: [string, number] = ['John', 30];
    let kevin: [string, number?];

    let tom: [string, number] = ['Tom', 25];
    tom.push('male');

    let animal = new Animal('Jack');

    let cat = new Cat('Tom'); 

    {
        let x = 123;
        let y = { x: 0, y: 1 };
        
        type A = typeof x; // number
        type B = typeof y; // { x: number, y: number }
    }
    
    // No error!
    let w: Car = new Golfer();

    //No error!
    fn({ k: 10 });


    let sq = new polygons.Square();

    let resolve: NameOrResolver;
}