import { Empty } from "./class";

const obj = {
    say( {name }: { name:string } ): void {
    console.log('Hello: ', name);
    },
};
export function test(this: typeof obj, str: string) {
    console.log(this.say({ name: str }));
}

   
export function fn(arg: Empty) {
    // do something?
}
   