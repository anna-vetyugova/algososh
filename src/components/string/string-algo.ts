import { TStringIntem } from "./types";

export default function reverseStringWithSteps(input: string): string[][] {
  const letters = input.split("");
  const steps: string[][] = [[...letters]];

  if (input.length <= 1) return steps;

  for (let left = 0; left < Math.floor(input.length / 2); left++) {
    const right = input.length - 1 - left;

    [letters[left], letters[right]] = [letters[right], letters[left]];
    steps.push([...letters]);
  }
  return steps;
}
