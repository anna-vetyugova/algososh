import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../string/string.module.css";
import reverseStringWithSteps from "./algorithm";
import { getChartStatus } from "./algorithm";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoader, setLoader] = useState(false);

  const startAlgorithm = () => {
    const newSteps = reverseStringWithSteps(input);
    setSteps(newSteps);
    setLoader(true);
    setCurrentStepIndex(0);

    if (!newSteps.length) return;

    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        setLoader(false);
        return;
      }
      setCurrentStepIndex(index++);
    }, 1000);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <div className={styles.main}>
          <Input
            isLimitText={true}
            maxLength={11}
            extraClass={styles.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
          />
          <Button
            text={"Развернуть"}
            onClick={startAlgorithm}
            isLoader={isLoader}
          />
        </div>
        <ul className={styles.circles}>
          {steps?.[currentStepIndex].map((char, index) => {
            const status = getChartStatus({ index, steps, currentStepIndex });
            const state =
              status === "sorted"
                ? ElementStates.Modified
                : status === "sorting"
                ? ElementStates.Changing
                : ElementStates.Default;
            return (
              <li key={index} className={styles.circle}>
                <Circle letter={char} state={state} />
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
