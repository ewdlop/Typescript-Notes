import { Sprite } from "./class";

export type Constructor = new (...args: any[]) => {};
export type ConstructorWithArgs<T> = new (...args: T[]) => {};
export type ConstructorWithArgsObject<T = {}> = new (...args: any[]) => T;
export type ConstructorWithArgsAndReturn<T, R> = new (...args: T[]) => R;
export type ConstructorWithReturn<R> = new (...args: any[]) => R;

export type Positionable = ConstructorWithArgsObject<{ setPos: (x: number, y: number) => void }>;
export type Spritable = ConstructorWithArgsObject<Sprite>;
export type Loggable = ConstructorWithArgsObject<{ print: () => void }>;

export function Scale<TBase extends Constructor>(Base: TBase) {
    return class Scaling extends Base {
        // Mixins may not declare private/protected properties
        // however, you can use ES2020 private fields
        _scale = 1;

        setScale(scale: number) {
            this._scale = scale;
        }

        get scale(): number {
            return this._scale;
        }
    };
}
export function Jumpable<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
        jump() {
            // This mixin will only work if it is passed a base
            // class which has setPos defined because of the
            // Positionable constraint.
            this.setPos(0, 20);
        }
    };
}
export function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    });
}


{
    const EightBitSprite = Scale(Sprite);
    const flappySprite = new EightBitSprite("Bird");
    flappySprite.setScale(0.8);
    console.log(flappySprite.scale);
}
{
    class Jumpable {
        jump() { }
    }

    class Duckable {
        duck() { }
    }

    // Including the base
    class Sprite {
        x = 0;
        y = 0;
    }
    interface Sprite extends Jumpable, Duckable { }
    applyMixins(Sprite, [Jumpable, Duckable]);
    let player = new Sprite();
    player.jump();
    console.log(player.x, player.y);
}