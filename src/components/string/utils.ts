import { TStringIntem } from "./types";

export function getChartStatus({
  index,
  steps,
  currentStepIndex,
}: TStringIntem) {
  const maxIndex = steps[currentStepIndex].length - 1;
  if (
    index < currentStepIndex ||
    index > maxIndex - currentStepIndex ||
    currentStepIndex === steps.length - 1
  ) {
    return "sorted";
  }

  if (index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return "sorting";
  }

  return "unsorted";
}
