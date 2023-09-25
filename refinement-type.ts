type PositiveNumber = number & { __positiveNumber: true };

function createPositiveNumber(value: number): PositiveNumber {
  if (value < 0) {
    throw new Error('The value must be positive.');
  }
  return value as unknown as PositiveNumber;
}

const myPositiveNumber: PositiveNumber = createPositiveNumber(42);
console.log(myPositiveNumber);