export const fibbonacchiNumber = (n: number): number[] => {
  let array: number[] = [1, 1];
  for (let i = 2; i <= n; i++) {
    const fib = array[i - 2] + array[i - 1];
    array.push(fib);
  }

  return array
}; 