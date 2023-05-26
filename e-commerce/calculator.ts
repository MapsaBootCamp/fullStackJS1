function jam(a: number, b: number): number {
  return a + b;
}

it('mikhaham jam zadan ro check kon!', () => {
  const a = 12,
    b = 12; //// arrange
  const result = jam(a, b); /// act
  expect(result).toBe(24); //// assert
});
