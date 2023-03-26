import { Chatroom, Shop } from "./interface";

export class Empty {}

export class Customer {}

export class Custom extends Customer implements Chatroom, Shop {
    connect(...args: [] | []) {
        console.log('welcome~');
    }
    buy() {
        console.log('buy successful');
    }
}

export class Car {
    drive(): void{
      // hit the gas
    }
}

export class Golfer {
    drive(): void {
    // hit the ball far
    }
}

  
export class Animal 
{
    public name: string;
    public constructor(name: string) {
      this.name = name;
    }
}
  

export abstract class AnimalBase 
{
    public name: string;
    public constructor(name: string) {
      this.name = name;
    }
    public abstract sayHi(): void;
}

export class Cat extends Animal {
    public eat() {
      console.log(`${this.name} is eating.`);
    }
}