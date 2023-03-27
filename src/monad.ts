export interface Functor<A> {
    map<B>( transform: (value: A) => B ): Functor<B>;
}

export interface Monad<A> {
    bind<B>( transform: (value: A) => Monad<B> ): Monad<B>;
}

export interface Maybe<T> {
    map<U>(fn: (value: T) => U): Maybe<U>;
    bind<U>(fn: (value: T) => Maybe<U>): Maybe<U>;
    orElse(value: T): T;
}

export class Just<T> implements Maybe<T> {
    constructor(private readonly value: T) { }

    map<U>(fn: (value: T) => U): Maybe<U> {
        return new Just(fn(this.value));
    }

    bind<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
        return fn(this.value);
    }

    orElse(value: T): T {
        return this.value;
    }
}

export class Nothing<T> implements Maybe<T> {
    map<U>(fn: (value: T) => U): Maybe<U> {
        return new Nothing();
    }

    bind<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
        return new Nothing();
    }

    orElse(value: T): T {
        return value;
    }
}


export class Either<E, A> {
    private constructor(private readonly value: E | A) {}
  
    static left<E, A>(value: E): Either<E, A> {
      return new Either<E, A>(value);
    }
}
  