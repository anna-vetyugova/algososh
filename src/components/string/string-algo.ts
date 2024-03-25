
type Props = {
  index: number;
  steps: string[][];
  currentStepIndex: number;
};

export default function reverseStringWithSteps(input: string): string[][] {
  const letters = input.split('');
  const steps: string[][] = [[...letters]];
  
  if(input.length <= 1) return steps;

  for(let left = 0; left < Math.floor(input.length / 2); left++) {
    const rigtht = input.length - 1 - left;
    [letters[left], letters[rigtht]] = [letters[rigtht], letters[left]];
    steps.push([...letters]);
  }
  return steps
}

export function getChartStatus({index, steps, currentStepIndex}: Props) {
  const maxIndex = steps[currentStepIndex].length - 1;
  if (
    index < currentStepIndex ||
    index > maxIndex - currentStepIndex ||
    currentStepIndex === steps.length - 1
  ) {
    return 'sorted';
  }
  
  if( index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return 'sorting'
  }

  return 'unsorted';
}