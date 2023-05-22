{
    type λ_BOOLEAN = (x: λ_BOOLEAN, y: λ_BOOLEAN) => λ_BOOLEAN;
    const TRUE = (x: λ_BOOLEAN, y: λ_BOOLEAN) => x;
    const FALSE = (x: λ_BOOLEAN, y: λ_BOOLEAN) => y;
    const AND = (x: λ_BOOLEAN, y: λ_BOOLEAN) => x(y, x);
    const OR = (x: λ_BOOLEAN, y: λ_BOOLEAN) => x(x, y);
    const NOT = (x: λ_BOOLEAN) => x(FALSE, TRUE);
    const XOR = (x: λ_BOOLEAN, y: λ_BOOLEAN) => x(NOT(y), y);
    const IF = (x: λ_BOOLEAN) => x;
    const IF_THEN_ELSE = (x: λ_BOOLEAN, y: λ_BOOLEAN, z: λ_BOOLEAN) => x(y, z);

    type λ = (f: (x: any) => any) => (x: any) => any;

    // Church numerals
    const ZERO: λ = (f) => (x) => x;
    const ONE: λ = (f) => (x) => f(x);
    const TWO: λ = (f) => (x) => f(f(x));
    const THREE: λ = (f) => (x) => f(f(f(x)));
    
    // SUCC function (returns the successor of a Church numeral).
    const SUCC: (n: λ) => λ = (n) => (f) => (x) => f(n(f)(x));

    const increment = (x: number) => x + 1;
    const toNumber = (n: λ) => n(increment)(0);
    console.log(toNumber(SUCC(ZERO)));  // Outputs: 1
}